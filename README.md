# Bojler

Quickly generate boilerplate files for your projects.

This tool powers [Bojler VSCode Extension](https://github.com/kamilmielnik/bojler-vscode).

## Installation

```
npm install bojler -g
```

## Setup

1. Create template files in `~/.bojler`, e.g. `~/.bojler/react-component.js`.

2. Add file templates to it:

```tsx
module.exports = ({ name }) => ({
  'index.ts': ({ content }) => {
    return content || `export { default } from './${name}';\n`;
  },

  [`${name}.scss`]: ({ content }) => content,

  [`${name}.tsx`]: ({ content }) => content
});
```

## Usage

```Shell
# bojler <template> <path>
bojler react-component components/MyComponent
```
