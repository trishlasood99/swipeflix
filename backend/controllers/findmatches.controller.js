function findMatchesController(Friend, RightSwipe, Match) {
  async function postSwipeAndCreateMatches(req, res) {
    if (!req.body.movieId) {
      return res.send({ message: 'Incomplete request' });
    }
    let swipe;
    let friends;
    try {
      swipe = await RightSwipe.find({ userId: req.userId, movieId: req.body.movieId }).exec();
    } catch (err) {
      return res.status(500).send(err);
    }
    try {
      friends = await Friend.find({ $or: [{ friend1: req.userId }, { friend2: req.userId }] }).exec();
    } catch (error) {
      return res.status(500).send(error);
    }
    if (swipe.length > 0) {
      return res.send({ message: 'User has already liked this movie' });
    }
    const newSwipe = new RightSwipe({
      userId: req.userId,
      movieId: req.body.movieId,
    });
    try {
      await newSwipe.save();
    } catch (err) {
      return res.status(500).send(err);
    }
    let flag = 0;
    for (const friend of friends) {
      let friendId;
      let friendSwipe;
      if (req.userId == friend.friend1) {
        friendId = friend.friend2;
      } else {
        friendId = friend.friend1;
      }
      try {
        friendSwipe = await RightSwipe.find({ userId: friendId, movieId: req.body.movieId }).exec();
      } catch (err) {
        return res.status(500).send(err);
      }
      if (friendSwipe.length > 0) {
        flag += 1;
        const newMatch = new Match({
          userId1: req.userId,
          userId2: friendId,
          movieId: req.body.movieId,
        });
        try {
          await newMatch.save();
        } catch (err) {
          return res.status(500).send(err);
        }
      }
    }
    return res.send({ message: `${flag} matches made!` });
  }

  return postSwipeAndCreateMatches;
}

module.exports = findMatchesController;
