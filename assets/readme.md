





# I'll use your library but I won't use your framework

## In search of the perfect node.js http api

A lightning talk by **Nuno Job**, js newb.
Nodejitsu, expense.cat, The Node Firm
http://github.com/dscape




















All the stuff here is over engineered
It's the answer for the "enterprisey scale " argument, here's how to maintain sanity if things fucking grow big













I don't do a lot of cool stuff that smart people do, so I mostly dabble in http. Mannn. I wont make out of this one alive will I?

I also do some streaming stuff, NLP, and learn me some javascript with fun projects like implementing pattern matching in node.js, or implementing a testing function and then finding out it's pretty similar to node-tap, which btw I've user several times.

I'm here to share some stuff and decisions I've made when building HTTP Clients and APIs in nodejs. I've used a bunch of so called frameworks, so I try to remain independent from the frame, but leverage the work.

Let's speed up.

















First things first, I don't like classes so my code will look like:

```js
var user = exports;

user.get = function get_user(name, cb) {
  if (typeof name !== "string") {
    cb(new Error('Invalid name!'));
  }
  return user.find_by_name(name, cb);
};
```

















Is everyone familiar the node convention of bubbling up errors as the first argument of your function? No? Bad luck, we don't have time for that! :)

The first problem i found in writing decent HTTP Clients and APIs in node.js can be found in this example. Some do something like this to fix it.


```js
var user = exports;

user.get = function get_user(name, cb) {
  cb = cb || function () {};
  if (typeof name !== "string") {
    cb(new Error('Invalid name!'));
  }
  return user.find_by_name(name, cb);
};
```

















This makes more harm then good, especially if your `user.find_by_name` call returns a stream.

In node.js it's expected that in the absence of a callback the stream will still be returned, hence you should be able to operate on the returned stream. However if you code like this you made it impossible for anyone using your library to know what is going on.

















Indexzero and I wrote a small utility called errs which is meant to deal with these kind of problems. Some will go like "bloated", or why do I need that. The answer is to assure your module will uphold it's promise that if there is a callback you return the error in the callback, if not a stream is returned.

``` js
var user = exports
  , errs = require('errs')
  ;

user.get = function get_user(name, cb) {
  if (typeof name !== "string") {
    // returns a stream iff callback is undefined, calls cb(err) otherwise
    return errs.handle(new Error('Invalid name!'), cb);
  }
  return user.find_by_name(name, cb);
};
```




























Now someone using your library knows that it's either going to return the error in the callback, or at the very least they can catch it on the stream


``` js
var user = require('./user');

var dscape = user.get('dscape');

dscape.on('error', function (err) { console.log('didnt crash my app'); });
```





















Still on errors, if you care enough about your api you are probably taking track of 4 things about each of the possible errors you are handling: a code to identify it, a http-status-code that it returns, a human readable error description, and keeping the stack trace at least in development environment and in the logs.

To avoid all the crazyness, simple rule of thumb is to put your "expressive" errors in the controllers and middle-wares.

``` js
var user = require('./user')
  , errs = require('errs')
  ;

user.get('dscape', function (err, user) {
  if(err) {
    errs.merge(err, 
      { code        : "controller:user:not_found"
      , status_code : 404
      , reason      : "Derped on dscape"
      });
  }
});
```

Now document the shit out of your api, your users deserve it.
























Use CouchDB

Seriously. It's awesome and fun.

Use follow. If you dare to use stuff written by me, use nano.





























Test your shit, it's fun to do in node.js























Center your code around your routes, make like easier for your fellow developers

































Do not use the conventions of your framework, fuck that.
Build your own.

Why do you need a box anyway? Draw any shape you like

This is how I normally structure my apps:

log json, decycle your json

make sure no libs are cluttering your uncaught exceptions, you should exit anyway.


























streaming stuff is easy
show downloading a video or something

























chat interaction with stdio and changes feed







