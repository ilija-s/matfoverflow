const jwt = require('jsonwebtoken');
const MY_SECRET = 'MY_SECRET';

module.exports.generateJWT = (data) => {
  return jwt.sign(data, MY_SECRET, { expiresIn: '7d' });
};

module.exports.verifyJWT = (token) => {
  return jwt.verify(token, MY_SECRET);
};
