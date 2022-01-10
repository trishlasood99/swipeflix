function movieController(Movie, UserPreference) {
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
  async function getAll(req, res) {
    try {
      preferences = await UserPreference.findOne({ user: req.userId }).exec();
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    let genres = preferences.genres;
    let regex = genres.join('|');
    let ratingGreaterThan = preferences.imdb_rating;
    let page = preferences.page;

    const queryOptions = {
      genres: {
        $regex: regex,
        $options: 'i',
      },
      imdb_score: {
        $gte: ratingGreaterThan,
      },
    };
    return Movie.find(queryOptions).limit(10).skip((page-1)*10)
      .sort('-imdb_score')
      .exec((err, movies) => {
        if(err) {
          return res.send(err);
        }
        if(movies) {
          preferences.page+=1;
          return preferences.save((error) => {
            if(error) {
              return res.status(500).send(error);
            }
            return res.json(movies);
          });
        }
        return res.status(404).send({ message: 'No more movies matching your preferences' });
      });
  }

  return {
    getById, post, del, getAll,
  };
}

module.exports = movieController;
