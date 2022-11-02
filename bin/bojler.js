#!/usr/bin/env node

const { boil, resolvePath } = require('../src');

const argv = Array.from(process.argv);
const args = argv.slice(2);
const [argTemplate, argFolderPath] = args;

const USAGE = 'Usage: node boil.js [template] [path]';

if (typeof argTemplate !== 'string') {
  throw new Error(USAGE);
}

if (typeof argFolderPath !== 'string') {
  throw new Error(USAGE);
}

boil(argTemplate, resolvePath(argFolderPath));
