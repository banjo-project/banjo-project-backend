
exports.seed = function (knex) {
  return knex('pets').del()
    .then(function () {
      return knex('pets').insert([
        { id: 1, name: 'Banjo', birthday: '2008-01-01', breed: 'mix', image: 'https://i5.wal.co/dfw/4ff9c6c9-a77b/k2-_864ef38f-4c7e-427e-8a3c-7415272c6919.v1.jpg', sex: 'boy' }
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('pets_id_seq', (SELECT MAX(id) FROM pets));`
      )
    })
}
