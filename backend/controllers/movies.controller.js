function movieController(Movie) {
  // to get movie details by id
  function getById(req, res) {
    return Movie.findById(req.params.movieId, (err, movie) => {
      if (err) {
        return res.send(err);
      }
      if (movie) {
        return res.json(movie);
      }
      return res.sendStatus(404);
    });
  }

  // to create a new movie record in the database
  function post(req, res) {
    const reqFields = ['director_name', 'duration', 'genres', 'movie_imdb_link',
      'title_year', 'imdb_score', 'movie_title'];
    for (const x of reqFields) {
      if (!req.body[x]) {
        return res.status(400).send(
          { message: `Input data doesn't contain the field ${x}` },
        );
      }
    }
    const newMovie = new Movie(req.body);
    return newMovie.save((err, movie) => {
      if (err) {
        return res.send(err);
      }
      return res.json(movie);
    });
  }

  // to delete a movie record from the database
  function del(req, res) {
    return Movie.deleteOne({ _id: req.params.movieId }, (err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    });
  }

  // to fetch paginated list of movie records from the database filtered by genre
  // and imdb_rating
  // TODO: Decide whether we bring in all the left-swiped movies too when the
  // rest of the list is exhausted
  function getAll(req, res) {
    // TODO: genre and imdb rating preferences to be input from the user
    // preferences collection
    const genres = ['Family', 'Sci-Fi', 'Action', 'Thriller'];
    const ratingGreaterThan = 7;
    const regex = genres.join('|');

    // TODO: page number will come from the user history collection
    const pageNo = 2;
    const queryOptions = {
      genres: {
        $regex: regex,
        $options: 'i',
      },
      imdb_score: {
        $gte: ratingGreaterThan,
      },
    };
    return Movie.find(queryOptions).limit(10).skip((pageNo - 1) * 10)
      .sort('-imdb_score')
      .exec((err, movies) => {
        if (err) {
          return res.send(err);
        }
        if (movies) {
          return res.json(movies);
        }
        return res.send({ message: 'No more movies matching your preferences' });
      });
  }

  return {
    getById, post, del, getAll,
  };
}

module.exports = movieController;
