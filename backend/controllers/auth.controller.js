// Controller for sign up, log in
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '../config.env' });

function authController(User) {
  function signUp(req, res) {
    if (!req.body.password) {
      return res.status(400)
        .send({ message: 'Incomplete request. Please provide a password' });
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8), // to create a hash that can be stored in the database
    });
    return newUser.save((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      return res.status(200).send(
        {
          message: 'User successfully registered!',
          username: user.username,
          email: user.email,
      });
    });
  }

  function logIn(req, res) {
    if (!req.body.username) {
      return res.status(400)
        .send({ message: 'Incomplete Request. Provide a username'});
    }
    return User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (!user) {
        return res.status(404).send({ message: 'This username does not exist' });
      }
      if (!req.body.password) {
        return res.status(400)
          .send({ message: 'Incomplete request. Provide a password' });
      }
      // compares given password with the hash stored in the collection
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(403)
          .send({ message: 'Incorrect password. Please try again' });
      }

      // generate a JWT token from the object in first argument
      // to be used for subsequent authentication
      var token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET,
          { expiresIn: 86400 });
      return res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    });
  }

  return {signUp, logIn};
}

module.exports = authController;
