
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('articles', table =>{
    table.increments('id').primary()
    table.string('title')
    table.string('filePath')
    table.dateTime('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('updatedAt')
    table.string('user_name').references('users.username')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('articles');
};
