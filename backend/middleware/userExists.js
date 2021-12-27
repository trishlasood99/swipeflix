// middleware to check that username provided in request body exists

const User = require('../models/user.model');

const checkUserExists = (req, res, next) => {
  if (!req.body.friend){
    return res.status(400).send('Incomplete request. Provide username of friend');
  }
  return User.findOne({username: req.body.friend }, (err, user) => {
    if (err) {
      return res.send(err);
    }
    if (user) {
      req.friendId = user._id;
      return next();
    }
    return res.status(404).send({ message: 'The given username does not exist' });
  });
}

module.exports = checkUserExists;
