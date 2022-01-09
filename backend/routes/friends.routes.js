const express = require('express');
const friendsController = require('../controllers/friends.controller');
const checkUserExists = require('../middleware/userExists');
const checkFriendsAlready = require('../middleware/friendRelationshipExists');

function routes(Friend) {
  const controller = friendsController(Friend);
  const friendsRouter = new express.Router();

  friendsRouter.get('/', controller.get);
  friendsRouter.post('/', [checkUserExists, checkFriendsAlready], controller.post);
  friendsRouter.delete('/:friendId', controller.del);

  return friendsRouter;
}

module.exports = routes;
