const express = require('express');
const checkDuplicateUserorEmail = require('../middleware/duplicateUsernameEmail');
const authController = require('../controllers/auth.controller');

function routes(User) {
  const controller = authController(User);
  const authRouter = new express.Router();

  // the middleware will first check if the provided username or email already exists
  authRouter.use('/signup', checkDuplicateUserorEmail);

  authRouter.post('/signup', controller.signUp);
  authRouter.post('/login', controller.logIn);

  return authRouter;
}

module.exports = routes;
