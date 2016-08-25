
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.string('latitude');
    table.string('longitude');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
