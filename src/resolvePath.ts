import path from 'path';

const resolvePath = (filepath: string): string => {
  return path.isAbsolute(filepath) ? filepath : path.join(process.cwd(), filepath);
};

export default resolvePath;
