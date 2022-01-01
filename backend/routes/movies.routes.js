const express = require('express');
const movieController = require('../controllers/movies.controller');

function routes(Movie) {
  const movieRouter = express.Router();
  const controller = movieController(Movie);

  movieRouter.route('/:movieId').get(controller.getById);

  movieRouter.route('/').post(controller.post);

  movieRouter.route('/:movieId').delete(controller.del);

  movieRouter.route('/').get(controller.getAll);

  return movieRouter;
}

module.exports = routes;
