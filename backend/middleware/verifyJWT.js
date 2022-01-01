/* middleware to check the jwt token in requests for protected resources */

const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-tokens'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  return jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send(err);
    }
    req.userId = decoded.id;
    req.username = decoded.username;
    return next();
  });
};

module.exports = verifyToken;
