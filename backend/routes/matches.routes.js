const express = require('express');
const matchController = require('../controllers/matches.controller');
const checkUserExists = require('../middleware/userExists.js');

function routes(Match) {
  const matchRouter = new express.Router();
  const controller = matchController(Match);

  matchRouter.get('/', controller.getAll);
  matchRouter.post('/', checkUserExists, controller.post);
  matchRouter.patch('/:matchId', controller.updateDate);
  matchRouter.delete('/:matchId', controller.del);

  return matchRouter;
}

module.exports = routes;
