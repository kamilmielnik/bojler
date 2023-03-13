import path from 'path';

import { BOILER_DIRECTORY } from './constants';
import { isTemplate, Template } from './types';

const readTemplate = (templateFilename: string): Template => {
  const template = require(path.resolve(BOILER_DIRECTORY, templateFilename));

  if (!isTemplate(template)) {
    throw new Error(`Invalid template found at "${template}"`);
  }

  return template;
};

export default readTemplate;
