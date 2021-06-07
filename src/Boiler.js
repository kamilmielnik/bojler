const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class Boiler {
  constructor(rootPath, getTemplates) {
    this.rootPath = rootPath;
    this.getTemplates = getTemplates;
  }

  get componentName() {
    const names = this.rootPath.split(path.sep);
    const componentName = names[names.length - 1];
    return componentName;
  }

  boil() {
    this.createRootDirectory();
    this.renderTemplates();
  }

  createRootDirectory() {
    mkdirp.sync(this.rootPath);
  }

  renderTemplates() {
    const templates = this.getTemplates({
      componentName: this.componentName,
      rootPath: this.rootPath
    });

    for (const [filename, renderTemplate] of Object.entries(templates)) {
      const filepath = path.isAbsolute(filename) ? filename : path.join(this.rootPath, filename);
      const template = renderTemplate({
        componentName: this.componentName,
        template: fs.existsSync(filepath) ? fs.readFileSync(filepath, 'utf-8') : ''
      });

      fs.writeFileSync(filepath, template);
    }
  }
}

module.exports = Boiler;
