var errs         = require('errs')
  , couch        = require('./lib/couch')
  , logger       = require('./lib/logger')
  , tasks        = require('./tasks')
  , bootstrapper = exports
  ;

bootstrapper.setup = function setup(callback) {

  var stream = couch.bootstrap();

  stream.on('error', function (err) {

    callback(err); 
    logger.log({bootstrap: false, err: err});

  });

  stream.on('end', function () {

    tasks.start();
    callback();
    logger.log({bootstrap: true});

  });

  return stream;

};

if(require.main === module) { 

  bootstrapper.setup();

}