var couch   = require('../lib/couch')
  , logger  = require('../lib/logger')
  , config  = require('../config').couch
  , interval
  , timeout = config.compact
  , compact = exports
  ;

compact.start = function start() {

  if(typeof timeout === "number") {

    interval = setInterval( function compact() {

      var stream = couch.compact();

      stream.on('error', function () { 
        logger.log({compact: "fail"}, "warn"); 
      });

      stream.on('end', function () {
        logger.log({compact: "ok"}, "silly");
      });

    }, timeout);

  }

};

compact.stop = function stop() {

  if(typeof timeout === "number") {

    clearInterval(interval);

  }

};