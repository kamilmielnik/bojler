const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const { BOILER_DIRECTORY } = require('./constants');

const boil = async (template, folderPath) => {
  await mkdirp(folderPath);

  const prepareTemplates = require(path.resolve(BOILER_DIRECTORY, template));
  const names = folderPath.split(path.sep);
  const name = names[names.length - 1];
  const templates = prepareTemplates({ name });

  for (const [filename, renderTemplate] of Object.entries(templates)) {
    const filepath = path.isAbsolute(filename) ? filename : path.join(folderPath, filename);
    const content = fs.existsSync(filepath) ? await fs.promises.readFile(filepath, 'utf-8') : '';
    const output = await renderTemplate({ content });
    await fs.promises.writeFile(filepath, output);
  }
};

module.exports = boil;
