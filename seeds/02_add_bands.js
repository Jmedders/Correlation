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
      name: 'galaxie 500'
    }),
    knex('bands').insert({
      name: 'luna'
    }),
    knex('bands').insert({
      name: 'halcyon high'
    }),
    knex('bands').insert({
      name: 'monster movie'
    }),
    knex('bands').insert({
      name: 'yo la tengo'
    }),
    knex('bands').insert({
      name: 'skywave'
    }),
    knex('bands').insert({
      name: 'malory'
    }),
    knex('bands').insert({
      name: 'blind mr. jones'
    }),
    knex('bands').insert({
      name: 'technicolor'
    }),
    knex('bands').insert({
      name: 'primal scream'
    }),
    knex('bands').insert({
      name: 'lsd and the search for god'
    }),
    knex('bands').insert({
      name: 'sweet trip'
    }),
    knex('bands').insert({
      name: 'lush'
    })
  );
};
