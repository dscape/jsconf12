var couch = require('../lib/couch').db
  , user = exports
  ;

user.create = function create(username, cb) {

  var user     = { username: username, type: "user" };

  couch.insert(user, 'user/' + username, function (err, body) {

    if(err) { 
      return cb(err);
    }

    user.id = body.id;
    cb(null, user);

  });

};