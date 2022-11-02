const path = require('path');

const resolvePath = (filepath) => {
  return path.isAbsolute(filepath) ? filepath : path.join(process.cwd(), filepath);
};

module.exports = resolvePath;
