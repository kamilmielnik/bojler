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

const os = require("os");
const path = require("path");
const { boil } = require("./Boiler");

const argv = Array.from(process.argv);
const args = argv.slice(2);
const [argRootPath] = args;

if (typeof argRootPath !== "string") {
  throw new Error("Usage: node boil.js [path]");
}

const BOIL_DIRECTORY = path.resolve(os.homedir(), ".boil");

const configFilepath = path.join(BOIL_DIRECTORY, "prezly.js");
const config = require(configFilepath);
const rootPath = path.isAbsolute(argRootPath)
  ? argRootPath
  : path.join(process.cwd(), argRootPath);

boil(rootPath, config);
