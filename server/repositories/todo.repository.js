const knex = require("../utils/knex");

async function all() {
  return knex("todos");
}

async function get(id) {
  const results = await knex("todos").where({ id });
  return results[0];
}

async function create(data) {
  const results = await knex("todos").insert(data).returning("*");
  return results[0];
}

async function update(id, properties) {
  const results = await knex("todos")
    .where({ id })
    .update({ ...properties })
    .returning("*");
  return results[0];
}

// delete is a reserved keyword
async function del(id) {
  const results = await knex("todos").where({ id }).del().returning("*");
  return results[0];
}

async function clear() {
  return knex("todos").del().returning("*");
}

async function count() {
  return knex("todos").count({ count: "*" });
}

module.exports = {
  all,
  get,
  create,
  update,
  delete: del,
  clear,
  count,
};
