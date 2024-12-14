const argon2 = require("argon2");

const userRepository = require("../repositories/user.repository.js");

const jwtUtils = require("../utils/jwt.js");

async function register(inputs) {
  const hashedPassword = await argon2.hash(inputs.password);

  const newInputs = {
    ...inputs,
    password: hashedPassword,
  };

  const userData = await userRepository.create(newInputs);

  const token = jwtUtils.createToken({
    email: userData.email,
    id: userData.id,
  });

  return {
    userData,
    token,
  };
}

async function login(inputs) {
  const user = await userRepository.findByEmail(inputs.email);

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const isMatched = await argon2.verify(user.password, inputs.password);

  if (!isMatched) {
    return {
      success: false,
      message: "Password is wrong",
    };
  }

  const token = jwtUtils.createToken({
    email: user.email,
    id: user.id,
  });

  return {
    success: true,
    userData: user,
    token,
  };
}

const services = {
  register,
  login,
};

module.exports = services;
