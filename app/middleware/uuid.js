module.exports = function uuid_mw(req, res, next) {

  var uuid  = (~~(Math.random() * 1e9)).toString(36);
  req._uuid = uuid;
  res.setHeader("x-api-uuid", uuid);
  next();

};