const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");

const workspaceService = require("../services/workspace.service.js");

async function getAllWorkspaces(req, res) {
  try {
    const queryParams = {
      search: req.query.search || "",
      sortBy: req.query.sortBy || "createdAt",
      order: req.query.order || "desc",
      page: req.query.page || 1,
    };

    const userId = req.user.id;

    const data = await workspaceService.getAllWorkspaces(queryParams, userId);

    res.json(data);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error when fetching data" });
  }
}

// async function getAllMembers(req, res) {
//   try {
//     const data = await workspaceService.getAllMembers(req.query);

//     res.json(data);
//   } catch (err) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: "Error when fetching data" });
//   }
// }

// async function getAllBoards(req, res) {
//   try {
//     const data = await workspaceService.getAllBoards(req.query);

//     res.json(data);
//   } catch (err) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: "Error when fetching data" });
//   }
// }

async function getWorkspace(req, res) {
  try {
    const userId = req.user.id;

    const data = await workspaceService.getWorkspace(req.params.id, userId);

    if (!data) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Data not found" });
    }

    res.json({ data });
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error when fetching data" });
  }
}

async function createWorkspace(req, res) {
  try {
    const newData = {
      name: req.body.name || "",
    };

    const userId = req.user.id;

    const data = await workspaceService.createWorkspace(newData, userId);

    res.status(StatusCodes.CREATED).json({ data });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error when creating data" });
  }
}

async function updateWorkspace(req, res) {
  try {
    const newData = {
      name: req.body.name,
    };

    const userId = req.user.id;

    const data = await workspaceService.updateWorkspace(
      req.params.id,
      userId,
      newData
    );

    if (!data) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Data not found" });
    }

    res.json({ data });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error when updating data" });
  }
}

async function deleteWorkspace(req, res) {
  try {
    const userId = req.user.id;

    const isSuccess = await workspaceService.deleteWorkspace(
      req.params.id,
      userId
    );

    if (!isSuccess) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Data not found" });
    }

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error when deleting data" });
  }
}

const controllers = {
  getAllWorkspaces,
  //   getAllMembers,
  //   getAllBoards,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
};

module.exports = controllers;
