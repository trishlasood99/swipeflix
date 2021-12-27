function friendsController(Friend) {

  function get(req, res) {
    return Friend.find({ $or: [{ friend1: req.userId }, { friend2: req.userId }] },
       (err, friends) => {
      if (err) {
        return res.send(err);
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
        username2: req.body.friend
      }
    );
    return newFriend.save((error, friend) => {
      if (error) {
        return res.send(error);
      }
      return res.json(friend);
    });
    /*
    if (!req.body.friend) {
      return res.status(400).send({ message: 'Incomplete request. Provide username of friend' });
    }
    return User.findOne({ username: req.body.friend }, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user) {
        const newFriend = new Friend(
          {
            friend1: req.userId,
            friend2: user._id,
            username1: req.username,
            username2: user.username,
          }
        );
        return newFriend.save((error, friend) => {
          if (error) {
            return res.send(error);
          }
          return res.json(friend);
        });
      }
      return res.status(404).send({ message: 'Cannot find the username of friend' });
    });*/
  }

  function del(req, res) {
    if (!req.body.friend) {
      return res.status(400).send({ message: 'Incomplete request. Provide username of friend' });
    }
    return Friend.findOne({
      $or: [
        {
          username1: req.body.friend,
          username2: req.username,
        },
        {
          username1: req.username,
          username2: req.body.friend,
        }
      ]
    }, (err, friend) => {
      if (err) {
        return res.send(err, friend);
      }
      if (friend) {
        return friend.remove((error) => {
          if (error) {
            return res.send(error);
          }
          return res.sendStatus(204);
        });
      }
      return res.status(404).send({ message: "No friend with this username found" });
    });
  }

  return { get, post, del };
}

module.exports = friendsController;
