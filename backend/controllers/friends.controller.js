function friendsController(Friend) {
  function get(req, res) {
    return Friend.find({
      $or: [
        { friend1: req.userId },
        { friend2: req.userId },
      ],
    }, (err, friends) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (friends) {
        return res.json(friends);
      }
      return res.status(404).send({ message: 'No friends found' });
    });
  }

  function post(req, res) {
    const newFriend = new Friend(
      {
        friend1: req.userId,
        friend2: req.friendId,
        username1: req.username,
        username2: req.body.friend,
      },
    );
    return newFriend.save((error, friend) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.json(friend);
    });
  }

  function del(req, res) {
    if (!req.params.friendId) {
      return res.status(400).send({ message: 'Incomplete request. Provide username of friend' });
    }
    return Friend.findById(req.params.friendId, (err, friend) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (friend) {
        return friend.remove((error) => {
          if (error) {
            return res.status(500).send(error);
          }
          return res.sendStatus(204);
        });
      }
      return res.status(404).send({ message: 'No friend with this username found' });
    });
  }

  return { get, post, del };
}

module.exports = friendsController;
