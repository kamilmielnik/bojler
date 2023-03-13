import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

import { BOILER_DIRECTORY } from './constants';
import { Template } from './types';

const boil = async (templateFilename: string, contextPath: string) => {
  await mkdirp(contextPath);

  const template: Template = require(path.resolve(BOILER_DIRECTORY, templateFilename));
  // TODO: isPrepareTemplates
  const names = contextPath.split(path.sep);
  const name = names[names.length - 1];
  const templates = template({ name });

  for (const [filename, renderTemplate] of Object.entries(templates)) {
    const filepath = path.isAbsolute(filename) ? filename : path.join(contextPath, filename);
    const content = fs.existsSync(filepath) ? await fs.promises.readFile(filepath, 'utf-8') : '';
    const output = await renderTemplate({ content });
    await fs.promises.writeFile(filepath, output);
  }
};

export default boil;

