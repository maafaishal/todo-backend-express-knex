const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const createToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

const validateToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  createToken,
  validateToken,
};
