const _ = require("lodash");

const todoRepository = require("../repositories/todo.repository.js");

const appConfig = require("../configs/app.config.js");

async function getAllTodos(queries) {
  const page = queries.page || 1;
  const search = queries.search || "";
  const sortBy = queries.sortBy || "createdAt";
  const order = queries.order || "desc";

  const limit = appConfig.todoLimit;

  const [todos, countData] = await Promise.all([
    todoRepository.all({
      page,
      search,
      sortBy,
      order,
      limit,
    }),
    todoRepository.count(),
  ]);

  const totalData = parseInt(countData[0].count, 10);
  const totalPages = Math.ceil(totalData / limit);

  return {
    data: todos,
    pagination: {
      page,
      limit,
      total: totalData,
      totalPages,
    },
  };
}

async function getTodo(id) {
  return todoRepository.get(id);
}

async function postTodo(data) {
  const newData = {
    title: data.title || "",
    order: data.order || 1,
    completed: data.completed || false,
  };

  return todoRepository.create(newData);
}

async function patchTodo(id, data) {
  const existingData = await todoRepository.get(id);
  console.log("🚀 ~ existingData:", existingData);

  if (!existingData) return undefined;

  console.log("here ");

  return todoRepository.update(id, data);
}

async function deleteAllTodos() {
  return todoRepository.clear();
}

async function deleteTodo(id) {
  const existingData = await todoRepository.get(id);

  if (!existingData) return false;

  await todoRepository.delete(id);

  return true;
}

const services = {
  getAllTodos,
  getTodo,
  postTodo,
  patchTodo,
  deleteAllTodos,
  deleteTodo,
};

module.exports = services;
