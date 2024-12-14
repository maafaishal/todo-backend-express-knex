const knex = require("../utils/knex");

const TABLE_NAME = "workspaces";

async function all(user_id) {
  return knex("workspaces").rightJoin(
    "workspace_members",
    "workspaces.id",
    "workspace_members.workspace_id"
  );
}

async function get(id) {
  const results = await knex(TABLE_NAME).where({ id });
  return results[0];
}

async function create(data) {
  const results = await knex(TABLE_NAME).insert(data).returning("*");
  return results[0];
}

async function update(id, newData) {
  const results = await knex(TABLE_NAME)
    .where({ id })
    .update({ ...newData })
    .returning("*");
  return results[0];
}

// delete is a reserved keyword
async function del(id) {
  const results = await knex(TABLE_NAME).where({ id }).del().returning("*");
  return results[0];
}

async function count() {
  return knex(TABLE_NAME).count({ count: "*" });
}

module.exports = {
  all,
  get,
  create,
  update,
  delete: del,
  count,
};
