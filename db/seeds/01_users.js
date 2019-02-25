
exports.seed = function (knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { id: 1, email: 'tmddms0223@hotmail.com', password: '$2a$10$8adZnSLxC2VTqvkuoahKRuSdYT72JhfG4tv3jhZEjdwjPiyBMqd.q', username: 'sarah', title: 'Banjo mom' },
        { id: 2, email: 'mokkan@gmail.com', password: '$2a$10$8adZnSLxC2VTqvkuoahKRuSdYT72JhfG4tv3jhZEjdwjPiyBMqd.q', username: 'michael', title: 'Banjo dad' }
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`
      )
    })
};