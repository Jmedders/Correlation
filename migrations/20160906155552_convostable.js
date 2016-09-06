exports.up = function(knex, Promise) {
  return knex.schema.createTable('convos', function(table){
    table.increments('id').primary();
    table.string('roomname').notNullable().unique();
    table.integer('user_id').notNullable();
    table.integer('user_id2').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('convos')
};
