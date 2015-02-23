var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  if (!req.headers.authorization) return handleError(res);

  // token needs to come in the form of "Bearer [[token]]"
  var token = req.headers.authorization.split(' ')[1];

  var payload = jwt.decode(token, config.TOKEN_SECRET);
  if (!payload.sub) return handleError;

  // if we are here, payload is valid.
  req.userId = payload.sub;
  next();
};

function handleError(res) {
  return res.status(401).send({
    error: 'You are not authorized'
  });
}
