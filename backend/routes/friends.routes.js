const express = require('express');
const friendsController = require('../controllers/friends.controller');
const verifyToken = require('../middleware/verifyJWT');
const checkUserExists = require('../middleware/userExists');
const checkFriendsAlready = require('../middleware/friendRelationshipExists');

function routes(Friend) {
  const controller = friendsController(Friend);
  const friendsRouter = new express.Router();

  friendsRouter.use('/', verifyToken);

  friendsRouter.get('/', controller.get);
  friendsRouter.post('/',[ checkUserExists, checkFriendsAlready], controller.post);
  friendsRouter.delete('/',checkUserExists, controller.del);

  return friendsRouter;
}

module.exports = routes;
