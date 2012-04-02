var flatiron     = require('flatiron')
  , errs         = require('errs')
  , config       = require('./config')
  , bootstrapper = require('./bootstrapper')
  , tasks        = require('./tasks')
  , logger       = require('./lib/logger')
  , uuid         = require('./middleware/uuid')
  , api_version  = require('./middleware/api_version')
  , log          = require('./middleware/log')
  , environment  = exports
  , app          = flatiron.app
  ;

environment.initialize = function initialize(callback) {

  app.use(flatiron.plugins.http, 
  { "before" : [ uuid, api_version ]
  , "after"  : [ log ]
  , "onError" : function not_found(err) {
      this.res.writeHead(404, { 'Content-Type': 'application/json' });
      this.res.json(
        { "error"       : "app:route:not_found" 
        , "reason"      : "No such route"
        , "status_code" : 404
        });
    }
  });

  app.get    = app.router.get;
  app.put    = app.router.put;
  app.post   = app.router.post;
  app.delete = app.router.delete;

  callback(app);

};

environment.start = function start(app, cb) {

  bootstrapper.setup(function (err) {

    app.start(config.www.port, function () {

      logger.log({"jsconf": "2012", "port": config.www.port}, "info");
      if(cb) { cb(); }

    });

  });

};

process.removeAllListeners('uncaughtException');

process.on('uncaughtException', function (err) {

  logger.log(errs.merge(err, {error: "app:uncaught"}), "error");

  tasks.stop();

  process.exit(1);

});