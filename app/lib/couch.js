var nano   = require('nano')
  , errs   = require('errs')
  , follow = require('follow')
  , logger = require('../lib/logger')
  , config = require('../config').couch
  , server = nano(config.master.uri)
  , master = server.use(config.master.db)
  , uri    = config.master.uri + '/' + config.master.db
  , couch  = exports
  ;

couch.bootstrap = function bootstrap() {

  return server.db.create(config.master.db);

};

couch.changes = function changes() {

  var feed = new follow.Feed(uri, {include_docs: true});
  feed.since = "now";
  return feed;

};

couch.db = master;

couch.compact = master.compact;