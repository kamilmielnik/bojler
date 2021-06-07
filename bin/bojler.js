#!/usr/bin/env node

const path = require('path');
const { boil, readProjectConfig, resolvePath } = require('../src');

const argv = Array.from(process.argv);
const args = argv.slice(2);
const [argRootPath] = args;

if (typeof argRootPath !== 'string') {
  throw new Error('Usage: node boil.js [path]');
}

const rootPath = resolvePath(argRootPath);
const config = readProjectConfig(rootPath);

if (!config) {
  throw new Error(`No project found for "${rootPath}"`);
}

boil(rootPath, config);
