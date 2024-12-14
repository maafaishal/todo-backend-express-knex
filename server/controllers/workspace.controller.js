const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");

const todoService = require("../services/todo.service.js");

async function getAllWorkspaces(req, res) {
  try {
    const queryParams = {
      search: req.query.search || "",
      sortBy: req.query.sortBy || "createdAt",
      order: req.query.order || "desc",
      page: req.query.page || 1,
    };

    const data = await todoService.getAllWorkspaces(queryParams);

    res.json(data);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error when fetching data" });
  }
}

// async function getAllMembers(req, res) {
//   try {
//     const data = await todoService.getAllMembers(req.query);

//     res.json(data);
//   } catch (err) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: "Error when fetching data" });
//   }
// }

// async function getAllBoards(req, res) {
//   try {
//     const data = await todoService.getAllBoards(req.query);

//     res.json(data);
//   } catch (err) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: "Error when fetching data" });
//   }
// }

async function getWorkspace(req, res) {
  try {
    const data = await todoService.getWorkspace(req.params.id);

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

    const data = await todoService.createWorkspace(newData);

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

    const data = await todoService.updateWorkspace(req.params.id, newData);

    if (!data) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Data not found" });
    }

    res.json({ data });
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error when updating data" });
  }
}

async function deleteWorkspace(req, res) {
  try {
    const isSuccess = await todoService.deleteWorkspace(req.params.id);

    if (!isSuccess) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Data not found" });
    }

    res.status(StatusCodes.NO_CONTENT).send();
  } catch {
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
