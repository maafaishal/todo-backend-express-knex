exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id");
      table.string("email", 100);
      table.text("password");
      table.string("full_name", 100);
      table.text("avatar_url");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("workspaces", function (table) {
      table.increments("id");
      table.string("name", 100);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("boards", function (table) {
      table.increments("id");
      table.string("name", 100);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table
        .integer("workspace_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("workspaces");
    })
    .createTable("todos", function (table) {
      table.increments("id");
      table.string("title", 100);
      table.text("description");
      table.integer("status");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table
        .integer("creator_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("users");
      table
        .integer("assignee_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("users");
      table
        .integer("board_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("boards");
    })

    .createTable("workspace_members", function (table) {
      table.increments("id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .integer("workspace_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("workspaces");
      table
        .integer("user_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("users");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("todos")
    .dropTable("workspaces")
    .dropTable("workspace_members")
    .dropTable("boards")
    .dropTable("users");
};
