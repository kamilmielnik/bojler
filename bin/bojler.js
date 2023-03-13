#!/usr/bin/env node

const { boil, resolvePath } = require('../build');

const argv = Array.from(process.argv);
const args = argv.slice(2);
const [argTemplateFilename, argContextPath, argParameters = '{}'] = args;

const USAGE = 'Usage: bojler <template> <path>';

if (typeof argTemplateFilename !== 'string') {
  throw new Error(USAGE);
}

if (typeof argContextPath !== 'string') {
  throw new Error(USAGE);
}

boil(argTemplateFilename, resolvePath(argContextPath), JSON.parse(argParameters));
