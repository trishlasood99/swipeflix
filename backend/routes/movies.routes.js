const express = require('express');
const movieController = require('../controllers/movies.controller');

function routes(Movie) {
  const movieRouter = express.Router();
  const controller = movieController(Movie);

  movieRouter.route('/movies/:movieId').get(controller.getById);

  movieRouter.route('/movies').post(controller.post);

  movieRouter.route('/movies/:movieId').delete(controller.del);

  movieRouter.route('/movies').get(controller.getAll);
  
  return movieRouter;
}

module.exports = routes;
