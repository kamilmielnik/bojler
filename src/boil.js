const Boiler = require('./Boiler');

const boil = (rootPath, getTemplates) => {
  const boiler = new Boiler(rootPath, getTemplates);
  boiler.boil();
};

module.exports = boil;
