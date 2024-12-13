const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");

const todoService = require("../services/todo.service.js");

async function getAllTodos(req, res) {
  try {
    const data = await todoService.getAllTodos(req.query);

    res.json(data);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error when fetching data" });
  }
}

async function getTodo(req, res) {
  try {
    const todo = await todoService.getTodo(req.params.id);

    if (!todo) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Data not found" });
    }

    res.json(todo);
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error when fetching data" });
  }
}

async function postTodo(req, res) {
  try {
    const todo = await todoService.postTodo(req.body);

    res.status(StatusCodes.CREATED).json(todo);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error when creating data" });
  }
}

async function patchTodo(req, res) {
  try {
    const todo = await todoService.patchTodo(req.params.id, req.body);

    if (!todo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Data not found" });
    }

    res.json(todo);
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error when updating data" });
  }
}

async function deleteAllTodos(req, res) {
  try {
    await todoService.deleteAllTodos();

    res.status(StatusCodes.NO_CONTENT).send();
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error when deleting data" });
  }
}

async function deleteTodo(req, res) {
  try {
    const isSuccess = await todoService.deleteTodo(req.params.id);

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
  getAllTodos,
  getTodo,
  postTodo,
  patchTodo,
  deleteAllTodos,
  deleteTodo,
};

module.exports = controllers;
