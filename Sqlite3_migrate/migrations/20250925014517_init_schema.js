/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table =>{
    table.string('username').primary()
    table.string('first_name')
    table.string('last_name')
    table.string('email')
    table.string('hash')
    table.boolean('isAdmin')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
