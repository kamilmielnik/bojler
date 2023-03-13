import fs from 'fs';

import { BOILER_DIRECTORY } from './constants';

const getTemplates = async (): Promise<string[]> => {
  const files = await fs.promises.readdir(BOILER_DIRECTORY);
  const templates = files.map((file) => file.replace(/\.js$/, ''));
  return templates;
};

export default getTemplates;
