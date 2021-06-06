const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const boil = (rootPath, getTemplates) => {
  const boiler = new Boiler(rootPath, getTemplates);
  boiler.boil();
};

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
    });

    for (const [filename, renderTemplate] of Object.entries(templates)) {
      const filepath = path.join(this.rootPath, filename);
      const template = renderTemplate({
        componentName: this.componentName,
        template: fs.existsSync(filepath)
          ? fs.readFileSync(filepath, "utf-8")
          : "",
      });

      fs.writeFileSync(filepath, template);
    }
  }
}

/////////////////////////////////////////////////////////////
//
// const PROJECT_PATH = path.resolve("~/projects/prezly/prezly");
// const FRONTEND_PROJECT_PATH = path.join(
//   PROJECT_PATH,
//   "/apps/backend/resources/javascripts"
// );
// const STYLESHEET_PATH = path.join(
//   PROJECT_PATH,
//   "/apps/backend/resources/stylesheets/style.scss"
// );

module.exports = {
  boil,
  Boiler,
};
