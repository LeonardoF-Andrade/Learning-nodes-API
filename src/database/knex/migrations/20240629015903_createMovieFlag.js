exports.up = (knex) =>
  knex.schema.createTable("movies_flag", (table) => {
    table.increments("id");
    table.text("name");
    table.integer("user_id").references("id").inTable("users");
    table
      .integer("note_id")
      .references("id")
      .inTable("movies")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("movies_flag");
