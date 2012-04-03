var environment = require('./environment')
  , users       = require('./controllers/users')
  , chat        = require('./controllers/chat')
  , server      = exports
  ;

server.run = function run(cb) {

  environment.initialize(function initialize(app) {

    app.get("/", function () { this.res.json({hey: "sup?"}); });

    app.put("/1/:user", users.create);

    app.post("/1/chat/:topic", chat.update);

    app.get("/1/chat/:topic", chat.show);

    environment.start(app, cb);

  });

};

if(require.main === module) {
  server.run();
}