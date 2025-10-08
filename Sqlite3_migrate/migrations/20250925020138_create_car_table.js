/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('cars', table=>{
    table.increments('id')
    table.string('name')
    table.string('user_name')
    .unsigned()
    .notNullable()
    .references('users.username')
    .onUpdate('CASCADE')
    .onDelete('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
