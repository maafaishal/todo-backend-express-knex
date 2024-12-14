const knex = require("../utils/knex");

const TABLE_NAME = "workspace_members";

async function findByIds(data) {
  const results = await knex(TABLE_NAME).where({
    workspace_id: data.workspace_id,
    user_id: data.user_id,
  });
  return results[0];
}

async function create(data) {
  const results = await knex(TABLE_NAME).insert(data).returning("*");
  return results[0];
}

async function deleteWorkspaces(workspace_id) {
  const results = await knex(TABLE_NAME)
    .where({ workspace_id })
    .del()
    .returning("*");
  return results[0];
}

const repository = {
  findByIds,
  create,
  deleteWorkspaces,
};

module.exports = repository;
