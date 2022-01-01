const express = require('express');
const rightSwipeController = require('../controllers/rightswipe.controller');

function routes(RightSwipe) {
  const controller = rightSwipeController(RightSwipe);
  const rightSwipeRouter = new express.Router();

  rightSwipeRouter.get('/', controller.get);
  rightSwipeRouter.post('/', controller.post);

  return rightSwipeRouter;
}

module.exports = routes;
