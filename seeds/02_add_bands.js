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
      name: 'pale saints'
    }),
    knex('bands').insert({
      name: 'codeine'
    }),
    knex('bands').insert({
      name: 'adult colour'
    }),
    knex('bands').insert({
      name: 'hammock'
    }),
    knex('bands').insert({
      name: 'brian eno'
    }),
    knex('bands').insert({
      name: 'vangelis'
    }),
    knex('bands').insert({
      name: 'gliss'
    }),
    knex('bands').insert({
      name: 'ringo deathstarr'
    }),
    knex('bands').insert({
      name: 'jesus and mary chain'
    }),
    knex('bands').insert({
      name: 'jimi hendrix'
    }),
    knex('bands').insert({
      name: 'carbon based lifeforms'
    }),
    knex('bands').insert({
      name: 'alvvays'
    }),
    knex('bands').insert({
      name: 'lush'
    })
  );
};
