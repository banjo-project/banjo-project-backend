exports.seed = function(knex) {
  return knex('notifications').del()
    .then(function () {
      return knex('notifications').insert([
        {id: 1, event_id: 1, sender_id: 2, receiver_id: 1}
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('notifications_id_seq', (SELECT MAX(id) FROM notifications));`
      )
    })
};