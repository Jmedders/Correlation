exports.up = function(knex, Promise) {
  return knex.schema.createTable('bands', function(table){
    table.increments('id').primary();
    table.string('name').notNullable().unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bands')
};
