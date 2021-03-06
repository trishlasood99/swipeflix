const express = require('express');
const userPreferencesController = require('../controllers/userpreferences.controller');

function routes(UserPreferences) {
  const controller = userPreferencesController(UserPreferences);
  const userPreferencesRouter = new express.Router();

  userPreferencesRouter.get('/', controller.get);

  userPreferencesRouter.post('/', controller.post);

  userPreferencesRouter.patch('/', controller.patch);

  return userPreferencesRouter;
}

module.exports = routes;
