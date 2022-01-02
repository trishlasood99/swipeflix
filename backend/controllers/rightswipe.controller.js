function rightSwipeController(RightSwipe) {
  function get(req, res) {
    const query = {
      userId: req.userId,
    };
    if (!req.query.movieId) {
      return res.status(400).send({ message: 'Incomplete query string' });
    }
    query.movieId = req.query.movieId;
    return RightSwipe.countDocuments(query, (err, count) => {
      if (err) {
        return res.send(err);
      }
      if (count > 0) {
        return res.send({ liked: true });
      }
      return res.status(404).send({ liked: false });
    });
  }

  function post(req, res) {
    const query = {
      userId: req.userId,
    };
    if (!req.body.movieId) {
      return res.status(400).send({ message: 'Incomplete request' });
    }
    query.movieId = req.body.movieId;
    return RightSwipe.countDocuments(query, (err, count) => {
      if (err) {
        return res.send(err);
      }
      if (count > 0) {
        return res.send({ message: 'User already likes movie' });
      }
      const newRightSwipe = new RightSwipe(
        {
          userId: req.userId,
          movieId: req.body.movieId,
        },
      );
      return newRightSwipe.save((error, swipe) => {
        if (error) {
          return res.send(err);
        }
        return res.send(swipe);
      });
    });
  }

  return { get, post };
}

module.exports = rightSwipeController;
