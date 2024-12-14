// const { StatusCodes } = require("http-status-codes");

// const workspaceService = require("../services/workspace.service.js");

async function dummyResponse(req, res) {
  res.json("Ok");
}

const controllers = {
  dummyResponse,
};

module.exports = controllers;
