const boil = require('./boil');
const Boiler = require('./Boiler');
const { readProjectConfig, resolvePath } = require('./lib');

module.exports = {
  boil,
  Boiler,
  readProjectConfig,
  resolvePath
};
