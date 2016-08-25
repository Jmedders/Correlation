var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),
    // Inserts seed entries
    knex('users').insert({
        username: 'test',
        password: bcrypt.hashSync('test', 8),
        latitude: "37.785834",
        longitude: "-122.406417"
    }),
    knex('users').insert({
        username: 'jeffrey',
        password: bcrypt.hashSync('test', 8),
        latitude: "30.024229",
        longitude: "-100.262098"
    })
  );
};
