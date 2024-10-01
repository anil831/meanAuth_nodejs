const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const constants = require('../constants');

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, roles: user.roles }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: constants.ACCESS_TOKEN_EXPIRES_IN });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: constants.REFRESH_TOKEN_EXPIRES_IN });
};

const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
