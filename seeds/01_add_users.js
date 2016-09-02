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
        username: 'dream',
        password: bcrypt.hashSync('test', 8),
        latitude: "40.0015967",
        longitude: "-105.2939675"
    }),
    knex('users').insert({
        username: 'jeffrey',
        password: bcrypt.hashSync('test', 8),
        latitude: "39.624229",
        longitude: "-105.262098"
    }),
    knex('users').insert({
        username: 'beta',
        password: bcrypt.hashSync('test', 8),
        latitude: "39.7537669",
        longitude: "-104.9976925"
    }),
    knex('users').insert({
        username: 'estes',
        password: bcrypt.hashSync('test', 8),
        latitude: "40.3663772",
        longitude: "-105.5681676"
    }),
    knex('users').insert({
        username: 'ned',
        password: bcrypt.hashSync('test', 8),
        latitude: "39.9651466",
        longitude: "-105.5212696"
    }),
    knex('users').insert({
        username: 'opera',
        password: bcrypt.hashSync('test', 8),
        latitude: "39.9481151",
        longitude: "-75.1680317"
    }),
    knex('users').insert({
        username: 'monkey',
        password: bcrypt.hashSync('test', 8),
        latitude: "40.0552195",
        longitude: "-74.9950516"
    }),
    knex('users').insert({
        username: 'penn',
        password: bcrypt.hashSync('test', 8),
        latitude: "39.9522188",
        longitude: "-75.1954024"
    }),
    knex('users').insert({
        username: 'prussia',
        password: bcrypt.hashSync('test', 8),
        latitude: "40.0113281",
        longitude: "-75.4075586"
    })
  );
};
