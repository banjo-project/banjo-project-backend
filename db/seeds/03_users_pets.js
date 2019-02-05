
exports.seed = function(knex) {
  return knex('users_pets').del()
    .then(function () {
      return knex('users_pets').insert([
        {id: 1, user_id: '1', pet_id: "1"},
        {id: 2, user_id: '2', pet_id: "1"},
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('users_pets_id_seq', (SELECT MAX(id) FROM users_pets));`
      )
    })
};