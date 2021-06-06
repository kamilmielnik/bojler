const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const boil = (rootPath, templates) => {
  const boiler = new Boiler(rootPath, templates);
  boiler.boil(true);
};

class Boiler {
  constructor(rootPath, templates) {
    this.rootPath = rootPath;
    this.templates = templates;
  }

  get componentName() {
    const names = this.rootPath.split(path.sep);
    const componentName = names[names.length - 1];
    return componentName;
  }

  boil(dry) {
    if (dry) {
      console.log(`Directory created: ${this.rootPath}`);
    } else {
      this.createRootDirectory();
    }

    for (const renderTemplate of this.templates) {
      const { filename, template } = renderTemplate({
        componentName: this.componentName,
      });
      const filepath = path.join(this.rootPath, filename);

      if (!fs.existsSync(filepath)) {
        if (dry) {
          console.log(`File created: ${filepath}`);

          if (template) {
            console.log(template);
          }
        } else {
          fs.writeFileSync(filepath, template);
        }
      }
    }
  }

  createRootDirectory() {
    mkdirp(this.rootPath);
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
