var version     = require('../package.json').version;

module.exports = function api_version_mw(req, res, next) {

  res.setHeader("x-api-version", version);
  next();

};