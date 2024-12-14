const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");

const authService = require("../services/auth.service.js");
const authSchema = require("../zod-schema/auth.schema");

async function register(req, res) {
  try {
    const inputs = {
      email: req.body.email,
      password: req.body.password,
      full_name: req.body.fullName,
    };

    const schemaResult = authSchema.registerSchema.safeParse(inputs);

    if (!schemaResult.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: schemaResult.error.errors[0].message });
    }

    const { userData, token } = await authService.register(inputs);

    res.json({
      data: userData,
      token,
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error during registration" });
  }
}

async function login(req, res) {
  try {
    const inputs = {
      email: req.body.email,
      password: req.body.password,
    };

    const schemaResult = authSchema.loginSchema.safeParse(inputs);

    if (!schemaResult.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "The inputs are wrong" });
    }

    const { success, message, userData, token } = await authService.login(
      inputs
    );

    if (!success) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    }

    res.json({
      data: userData,
      token,
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error during login" });
  }
}

const controllers = {
  register,
  login,
};

module.exports = controllers;
