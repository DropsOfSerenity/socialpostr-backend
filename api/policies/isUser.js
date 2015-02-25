module.exports = function (req, res, next) {
  User.findOne(req.params.id).exec(function (err, user) {
    if (user.id !== req.userId) {
      return res.status(401).send({
        error: 'You do not have access to that resource.'
      });
    }
  next();
  });
};
