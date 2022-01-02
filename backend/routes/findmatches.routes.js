const express = require('express');
const findMatchesController = require('../controllers/findmatches.controller');

function routes(Friend, RightSwipe, Match) {
  const findMatchesRouter = new express.Router();
  const postSwipeAndCreateMatches = findMatchesController(Friend, RightSwipe, Match);
  findMatchesRouter.post('/', postSwipeAndCreateMatches);

  return findMatchesRouter;
}

module.exports = routes;
