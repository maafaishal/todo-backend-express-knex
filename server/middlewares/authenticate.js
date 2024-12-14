const { StatusCodes } = require("http-status-codes");

const jwtUtils = require("../utils/jwt.js");

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader.split(" ")[1];

    const decodedToken = jwtUtils.validateToken(token);

    if (!decodedToken) {
      throw Error();
    }

    req.user = decodedToken;

    next();
  } catch (err) {
    console.log("🚀 ~ authenticate ~ err:", err);
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
  }
}

module.exports = authenticate;
