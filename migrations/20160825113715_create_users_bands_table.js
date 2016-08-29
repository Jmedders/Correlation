exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_bands', function(table){
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.integer('band_id').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_bands')
};
