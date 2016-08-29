exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users_bands').del(),
    // Inserts seed entries
    knex('users_bands').insert({
      user_id: 1,
      band_id: 6,
    }),
    knex('users_bands').insert({
      user_id: 2,
      band_id: 6,
    }),
    knex('users_bands').insert({
      user_id: 1,
      band_id: 2,
    }),
    knex('users_bands').insert({
      user_id: 1,
      band_id: 1,
    }),
    knex('users_bands').insert({
      user_id: 2,
      band_id: 3,
    }),
    knex('users_bands').insert({
      user_id: 2,
      band_id: 5,
    }),
    knex('users_bands').insert({
      user_id: 1,
      band_id: 5,
    }),
    knex('users_bands').insert({
      user_id: 3,
      band_id: 1,
    }),
    knex('users_bands').insert({
      user_id: 3,
      band_id: 7,
    }),
    knex('users_bands').insert({
      user_id: 2,
      band_id: 4,
    })
  );
};
