var statuses = require('../models/statuses')
  , chat     = exports
  ;

chat.update = function update(topic) {

  var self   = this
    , status = self.req.body
    , opts   = self.req.query || {}
    , user   = opts.user || "lazy_" + (~~(Math.random() * 1e9)).toString(36)
    ;

  status.topic = topic;
  status.user  = user;

  statuses.create(status, function (err, status) {

    if (err) {

      err = errs.merge(err, 
        { error: "controller:chat:update"
        , status_code: 500
        , reason: "Couldn't update status"
        });

      return self.res.json(err.status_code, err);

    }

    self.res.json(status);

  });

};

chat.show = function show(topic) {

  var self  = this;

  statuses.changes(topic, self.res.response.connection, function (status) {
    self.res.write(status.user + ": ");
    self.res.write(status.message);
    self.res.write("\n");
  });

};