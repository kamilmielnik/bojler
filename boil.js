/**
 * Usage: node boil.js [path]
 *
 * Example: node boil.js components/Dropdown
 * It will create (relatively to CWD):
 *     - components/Dropdown/index.ts
 *     - components/Dropdown/Dropdown.scss
 *     - components/Dropdown/Dropdown.tsx
 * It will add Dropdown.scss import to /resources/stylesheets/style.scss
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const { boil } = require("./Boiler");

const BOIL_DIRECTORY = path.resolve(os.homedir(), ".boil");
const defaultConig = require(path.join(BOIL_DIRECTORY, "prezly.js"));

const argv = Array.from(process.argv);
const args = argv.slice(2);
const [argRootPath] = args;

if (typeof argRootPath !== "string") {
  throw new Error("Usage: node boil.js [path]");
}

const rootPath = resolvePath(argRootPath);
const config = getConfig(rootPath);

boil(rootPath, config);

function resolvePath(filepath) {
  return path.isAbsolute(filepath)
    ? filepath
    : path.join(process.cwd(), filepath);
}

function getConfig(rootPath) {
  const configFilenames = fs.readdirSync(BOIL_DIRECTORY);
  const configs = configFilenames.map((configFilename) => {
    const configFilepath = path.join(BOIL_DIRECTORY, configFilename);
    return require(configFilepath);
  });
  const config = configs.find((project) => {
    return rootPath.includes(project.PROJECT_PATH);
  });
  return config || defaultConig;
}
