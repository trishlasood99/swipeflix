/* middleware to check the jwt token in requests for protected resources */

const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config.env' });

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-tokens'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  return jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized Access!' });
    }
    req.userId = decoded.id;
    return next();
  });
};

module.exports = verifyToken;