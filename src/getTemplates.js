const fs = require('fs');

const { BOILER_DIRECTORY } = require('./constants');

const getTemplates = async () => {
  const files = await fs.promises.readdir(BOILER_DIRECTORY);
  const templates = files.map((file) => file.replace(/\.js$/, ''));
  return templates;
};

module.exports = getTemplates;
