const knex = require("../utils/knex");

const TABLE_NAME = "users";

async function findByEmail(email) {
  const results = await knex(TABLE_NAME).where({ email });
  return results[0];
}

async function create(data) {
  const results = await knex(TABLE_NAME).insert(data).returning("*");
  return results[0];
}

module.exports = {
  findByEmail,
  create,
};
