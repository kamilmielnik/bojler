const fs = require('fs');
const os = require('os');
const path = require('path');

const BOIL_DIRECTORY = path.resolve(os.homedir(), '.bojler');

const resolvePath = (filepath) => {
  return path.isAbsolute(filepath) ? filepath : path.join(process.cwd(), filepath);
};

const readProjectConfig = (rootPath) => {
  const configFilenames = fs.readdirSync(BOIL_DIRECTORY);
  const configs = configFilenames.map((configFilename) => {
    const configFilepath = path.join(BOIL_DIRECTORY, configFilename);
    return require(configFilepath);
  });
  const config = configs.find((project) => {
    return rootPath.includes(project.PROJECT_PATH);
  });

  if (config) {
    return config;
  }

  const defaultConfig = configs.find((project) => {
    return typeof project.PROJECT_PATH === 'undefined';
  });

  return defaultConfig;
};

module.exports = {
  readProjectConfig,
  resolvePath
};
