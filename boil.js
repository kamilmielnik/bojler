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

const path = require("path");
const { boil } = require("./Boiler");

const argv = Array.from(process.argv);
const args = argv.slice(2);
const [rootPath] = args;

if (typeof rootPath !== "string") {
  throw new Error("Usage: node boil.js [path]");
}

boil(path.join(process.cwd(), rootPath), ({ componentName }) => ({
  "index.ts": ({ template }) => {
    return template || `export { default } from './${componentName}';\n`;
  },
  [`${componentName}.scss`]: ({ template }) => template,
  [`${componentName}.tsx`]: ({ template }) => template,
}));
