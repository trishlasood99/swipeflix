function userPreferencesController(UserPreferences) {
  function get(req, res) {
    if (!req.userId) {
      return res.status(400).send({ message: 'Incomplete request. Request does not provide userId' });
    }
    return UserPreferences.findOne({ user: req.userId }, (err, preferences) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (preferences) {
        return res.json(preferences);
      }
      return res.status(404).send({ message: 'User preferences not found!' });
    });
  }

  function post(req, res) {
    if (!req.userId) {
      return res.status(400).send({ message: 'Incomplete request. Request does not provide userId' });
    }
    const newUserPreferences = new UserPreferences(
      {
        user: req.userId,
        genres: req.body.genres,
        imdb_rating: req.body.imdb_rating,
        page: 1,
      },
    );

    return newUserPreferences.save((err, pref) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json(pref);
    });
  }

  function patch(req, res) {
    if (!req.userId) {
      return res.status(400).send({ message: 'Request does not provide userId' });
    }
    return UserPreferences.findOne({ user: req.userId }, (err, record) => {
      if (err) {
        return res.status(500).send(err);
      }

      // loops over key-value pairs in request body and updates those fields in the fetched
      // user preferences record
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        record[key] = value;
      });
      record.page=1;
      return record.save((error) => {
        if (error) {
          return res.status(500).send(error);
        }
        return res.json(record);
      });
    });
  }

  return { get, post, patch };
}

module.exports = userPreferencesController;
