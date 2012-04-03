var cycle  = require('cycle')
  , pid    = process.pid
  , logger = exports
  ;

logger.log = function log(json, severity) {

  json._date     = Date.now();
  json._pid      = pid;
  json._severity = typeof severity === "string" ? severity: "info";

  console.log(JSON.stringify(cycle.decycle(json)));

};