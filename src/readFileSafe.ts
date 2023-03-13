import fs from 'fs';

const readFileSafe = async (filepath: string): Promise<string> => {
  try {
    return await fs.promises.readFile(filepath, 'utf-8');
  } catch {
    return '';
  }
};

export default readFileSafe;
