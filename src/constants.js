const os = require('os');
const path = require('path');

const BOILER_DIRECTORY = path.resolve(os.homedir(), '.bojler');

module.exports = {
  BOILER_DIRECTORY
};
