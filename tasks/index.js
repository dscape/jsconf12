var tasks = ['compact']
  , init = exports
  ;

init.start = function start() {

  tasks.forEach(function (task) {

    var lib = require('./' + task);

    process.nextTick(function () {
      lib.start();
    });

  });

};

init.stop = function stop() {

  tasks.forEach(function (task) {

    var lib = require('./' + task);

    lib.stop();

  });

};