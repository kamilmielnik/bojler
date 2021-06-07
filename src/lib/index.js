const fs = require('fs');
const os = require('os');
const path = require('path');

const BOIL_DIRECTORY = path.resolve(os.homedir(), '.boil');

const resolvePath = (filepath) => {
  return path.isAbsolute(filepath) ? filepath : path.join(process.cwd(), filepath);
};

const readProjectConfig = (rootPath) => {
  const configFilenames = fs.readdirSync(BOIL_DIRECTORY);
  const configs = configFilenames.map((configFilename) => {
    const configFilepath = path.join(BOIL_DIRECTORY, configFilename);
    return require(configFilepath);
  });
  return configs.find((project) => {
    return rootPath.includes(project.PROJECT_PATH);
  });
};

module.exports = {
  readProjectConfig,
  resolvePath
};
