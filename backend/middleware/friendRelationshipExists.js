// middleware to check whether logged in user and username provided are already friends

const Friend = require('../models/friend.model');

const checkFriendsAlready = (req, res, next) => {
  return Friend.find({
    $or: [
      {
        username1: req.username,
        username2: req.body.friend,
      },
      {
        username1: req.body.friend,
        username2: req.username,
      },
    ],
  }, (err, records) => {
    if (err) {
      return res.send(err);
    }
    if (records.length > 0) {
      return res.status(200).send({ message: `${req.body.friend} is already a friend` });
    }
    return next();
  });
};

module.exports = checkFriendsAlready;
