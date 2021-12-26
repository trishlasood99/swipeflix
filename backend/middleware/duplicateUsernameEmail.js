/*
this middleware will check if the username or password being used for
creating an account is using a username or password already in use
*/
const User = require('../models/user.model');

const checkDuplicateUserorEmail = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).send('No username provided');
  }
  return User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.send(err);
    }
    if (user) {
      return res.send('Username already in use');
    }
    if (!req.body.email) {
      return res.status(400).send('No email address provided');
    }
    return User.findOne({ email: req.body.email }, (error, users) => {
      if (error) {
        return res.send(error);
      }
      if (users) {
        return res.send('Email address already in use');
      }
      return next();
    });
  });
};

module.exports = checkDuplicateUserorEmail;
