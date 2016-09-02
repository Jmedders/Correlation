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
      user_id: 4,
      band_id: 8,
    }),
    knex('users_bands').insert({
      user_id: 5,
      band_id: 8,
    }),
    knex('users_bands').insert({
      user_id: 4,
      band_id: 6,
    }),
    knex('users_bands').insert({
      user_id: 5,
      band_id: 6,
    }),
    knex('users_bands').insert({
      user_id: 6,
      band_id: 10,
    }),
    knex('users_bands').insert({
      user_id: 6,
      band_id: 11,
    }),
    knex('users_bands').insert({
      user_id: 7,
      band_id: 10,
    }),
    knex('users_bands').insert({
      user_id: 7,
      band_id: 11,
    }),
    knex('users_bands').insert({
      user_id: 8,
      band_id: 9,
    }),
    knex('users_bands').insert({
      user_id: 9,
      band_id: 9,
    }),
    knex('users_bands').insert({
      user_id: 10,
      band_id: 9,
    }),
    knex('users_bands').insert({
      user_id: 8,
      band_id: 10,
    }),
    knex('users_bands').insert({
      user_id: 8,
      band_id: 11,
    }),
    knex('users_bands').insert({
      user_id: 3,
      band_id: 12,
    }),
    knex('users_bands').insert({
      user_id: 4,
      band_id: 13,
    }),
    knex('users_bands').insert({
      user_id: 1,
      band_id: 13,
    }),
    knex('users_bands').insert({
      user_id: 2,
      band_id: 14,
    }),
    knex('users_bands').insert({
      user_id: 5,
      band_id: 14,
    }),
    knex('users_bands').insert({
      user_id: 7,
      band_id: 15,
    }),
    knex('users_bands').insert({
      user_id: 9,
      band_id: 15,
    }),
    knex('users_bands').insert({
      user_id: 9,
      band_id: 16,
    }),
    knex('users_bands').insert({
      user_id: 9,
      band_id: 17,
    }),
    knex('users_bands').insert({
      user_id: 9,
      band_id: 18,
    }),
    knex('users_bands').insert({
      user_id: 6,
      band_id: 20,
    }),
    knex('users_bands').insert({
      user_id: 5,
      band_id: 19,
    }),
    knex('users_bands').insert({
      user_id: 4,
      band_id: 20,
    }),
    knex('users_bands').insert({
      user_id: 5,
      band_id: 21,
    }),
    knex('users_bands').insert({
      user_id: 8,
      band_id: 22,
    }),
    knex('users_bands').insert({
      user_id: 9,
      band_id: 23,
    }),
    knex('users_bands').insert({
      user_id: 10,
      band_id: 22,
    }),
    knex('users_bands').insert({
      user_id: 10,
      band_id: 23,
    })
  );
};
