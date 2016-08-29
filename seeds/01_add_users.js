var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),
    // Inserts seed entries
    knex('users').insert({
        username: 'test',
        password: bcrypt.hashSync('test', 8),
        latitude: "39.8915967",
        longitude: "-105.2839675"
    }),
    knex('users').insert({
        username: 'jeffrey',
        password: bcrypt.hashSync('test', 8),
        latitude: "39.624229",
        longitude: "-105.262098"
    })
  );
};
