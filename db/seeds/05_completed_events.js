exports.seed = function(knex) {
  return knex('completed_events').del()
    .then(function () {
      return knex('completed_events').insert([
        {id: 1, event_id: 1, user_id: 1},
        {id: 2, event_id: 2, user_id: 1},
        {id: 3, event_id: 3, user_id: 2},
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('completed_events_id_seq', (SELECT MAX(id) FROM completed_events));`
      )
    })
};