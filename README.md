# Bojler

Quickly generate boilerplate files for your projects.

## Setup

1. Clone this repo
2. `npm install`
3. Create an alias for the bin file in your shell `alias bojler='node /home/kamil/projects/bojler/bin/bojler.js'`

## Project setup

1. Create a configuration file for your project in `~/.bojler`, e.g. `~/.bojler/todomvc.js`.

2. Add some templates to it:

```tsx
const path = require('path');

module.exports = ({ componentName, rootPath }) => ({
  'index.ts': ({ template }) => {
    return template || `export { default } from './${componentName}';\n`;
  },

  [`${componentName}.scss`]: ({ template }) => template,

  [`${componentName}.tsx`]: ({ template }) => template
});
```

3. Make sure to define `PROJECT_PATH`:

```tsx
const path = require('path');

+const PROJECT_PATH = path.resolve('/home/kamil/projects/todomvc');

module.exports = ({ componentName, rootPath }) => ({
  'index.ts': ({ template }) => {
    return template || `export { default } from './${componentName}';\n`;
  },

  [`${componentName}.scss`]: ({ template }) => template,

  [`${componentName}.tsx`]: ({ template }) => template
});
+
+module.exports.PROJECT_PATH = PROJECT_PATH;
```

## Usage

```Shell
boiler components/MyComponent
```
