
exports.seed = function (knex) {
  return knex('pets').del()
    .then(function () {
      return knex('pets').insert([
        { id: 1, name: 'Banjo', birthday: '2008-01-01', breed: 'mix', sex: 'BOY' },
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('pets_id_seq', (SELECT MAX(id) FROM pets));`
      )
    })
};
