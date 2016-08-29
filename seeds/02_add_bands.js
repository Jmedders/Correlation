exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('bands').del(),
    // Inserts seed entries
    knex('bands').insert({
      name: 'slint'
    }),
    knex('bands').insert({
      name: 'slowdive'
    }),
    knex('bands').insert({
      name: 'mazzy star'
    }),
    knex('bands').insert({
      name: 'cocteau twins'
    }),
    knex('bands').insert({
      name: 'my bloody valentine'
    }),
    knex('bands').insert({
      name: 'ride'
    })
  );
};
