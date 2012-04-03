var union  = require('union')
  , logger = require('../lib/logger')
  ;

module.exports = function log_mw_constructor() {

  var stream   = new union.ResponseStream();

  stream.on('pipe', function () {
    var req = this.req
      , res = this.res
      ;

    req.once('end', function() {
      var statusCode = res && res.statusCode || 200
        , method     = req.method
        , url        = req.url
        , uuid       = res && res._headers["x-api-uuid"] || req._uuid
        ;
      logger.log(
        { uuid: uuid, method: method, url: url, status_code: statusCode },
        "info");
    });
  });

  return stream; 

};