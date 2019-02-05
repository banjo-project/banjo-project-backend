
exports.seed = function(knex) {
  return knex('events').del()
    .then(function () {
      return knex('events').insert([
        {id: 1, pet_id: 1, event_type: "WALK", time: '8'},
        {id: 2, pet_id: 1, event_type: "POTTY", time: '8'},
        {id: 3, pet_id: 1, event_type: "WALK", time: '11'},
        {id: 4, pet_id: 1, event_type: "WALK", time: '17'},
        {id: 5, pet_id: 1, event_type: "POTTY", time: '17'},
        {id: 6, pet_id: 1, event_type: "EAT", time: '18'},
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));`
      )
    })
};
