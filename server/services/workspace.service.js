const _ = require("lodash");

const todoRepository = require("../repositories/todo.repository.js");

const appConfig = require("../configs/app.config.js");

async function getAllWorkspaces(queryParams) {
  const limit = appConfig.todoLimit;

  const [data, countData] = await Promise.all([
    todoRepository.all({
      ...queryParams,
      limit,
    }),
    todoRepository.count(),
  ]);

  const totalData = parseInt(countData[0].count, 10);
  const totalPages = Math.ceil(totalData / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total: totalData,
      totalPages,
    },
  };
}

async function getWorkspace(id) {
  return todoRepository.get(id);
}

async function createWorkspace(newData) {
  return todoRepository.create(newData);
}

async function updateWorkspace(id, data) {
  const existingData = await todoRepository.get(id);

  if (!existingData) return undefined;

  return todoRepository.update(id, data);
}

async function deleteWorkspace(id) {
  const existingData = await todoRepository.get(id);

  if (!existingData) return false;

  await todoRepository.delete(id);

  return true;
}

const services = {
  getAllWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteAllTodos,
  deleteWorkspace,
};

module.exports = services;
