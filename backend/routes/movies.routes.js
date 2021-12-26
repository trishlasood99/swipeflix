const express = require('express');
const movieController = require('../controllers/movies.controller');
const verifyToken = require('../middleware/verifyJWT');

function routes(Movie) {
  const movieRouter = express.Router();
  const controller = movieController(Movie);

  // middleware to extract and verify JWT token so that no unauthorized person
  // can access the endpoint
  movieRouter.use(verifyToken);

  movieRouter.route('/:movieId').get(controller.getById);

  movieRouter.route('/').post(controller.post);

  movieRouter.route('/:movieId').delete(controller.del);

  movieRouter.route('/').get(controller.getAll);

  return movieRouter;
}

module.exports = routes;
