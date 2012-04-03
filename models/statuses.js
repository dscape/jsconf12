var couch    = require('../lib/couch')
  , logger   = require('../lib/logger')
  , master   = couch.db
  , statuses = exports
  ;

statuses.changes = function changes(topic, connection, cb) {

  var feed = couch.changes();

  connection.on("close", function () {

    feed.stop();
    return;

  });

  feed.filter = function(doc) {

    return (typeof doc.message === "string" && doc.topic === topic);

  };

  feed.on('change', function (status) {
    cb(status.doc);
  });
  
  feed.on('error', function(err) {

    logger.log({follow: err});

  });

  feed.follow();

}

statuses.create = function create(status, cb) {

  status.type  = "status";

  master.insert(status, 
    'status/' + Date.now() + '/' + (~~(Math.random() * 1e9)).toString(36), 
    function (err, body) {

      if(err) { 
        return cb(err);
      }

      status.id = body.id;
      cb(null, status);

    });

};