function matchController(Match) {
  function getAll(req, res) {
    return Match.find({
      $or: [
        { userId1: req.userId },
        { userId2: req.userId },
      ],
    }, (err, matches) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json(matches);
    });
  }

  function del(req, res) {
    return Match.findOneAndDelete({ _id: req.params.matchId }, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(203).send({ message: 'Match successfully deleted.' });
    });
  }

  function post(req, res) {
    const query1 = {
      userId1: req.userId,
      userId2: req.friendId,
      movieId: req.body.movieId,
    };
    const query2 = {
      userId2: req.userId,
      userId1: req.friendId,
      movieId: req.body.movieId,
    };
    return Match.countDocuments({ $or: [query1, query2] }, (err, count) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (count > 0) {
        return res.send({ message: 'Match already exists' });
      }
      const newMatch = new Match({
        userId1: req.userId,
        userId2: req.friendId,
        movieId: req.body.movieId,
      });
      return newMatch.save((error, match) => {
        if (error) {
          return res.status(500).send(error);
        }
        return res.json(match);
      });
    });
  }

  function updateDate(req, res) {
    if (!req.body.date) {
      return res.status(400).send({ message: 'Incomplete request' });
    }
    return Match.findOneAndUpdate({ _id: req.params.matchId }, {
      isDateSet: true,
      date: req.body.date,
    }, { returnDocument: 'after' }, (err, match) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json(match);
    });
  }

  return {
    getAll, post, del, updateDate,
  };
}

module.exports = matchController;
