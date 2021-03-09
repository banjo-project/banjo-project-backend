
exports.seed = function (knex) {
  return knex('events').del()
    .then(function () {
      return knex('events').insert([
        { id: 1, pet_id: 1, event_type: 'walk', time: '08:00' },
        { id: 2, pet_id: 1, event_type: 'potty', time: '08:00' },
        { id: 3, pet_id: 1, event_type: 'walk', time: '11:10' },
        { id: 4, pet_id: 1, event_type: 'walk', time: '17:20' },
        { id: 5, pet_id: 1, event_type: 'potty', time: '17:20' },
        { id: 6, pet_id: 1, event_type: 'eat', time: '18:00' },
        { id: 7, pet_id: 1, event_type: 'walk', time: '20:00' },
        { id: 8, pet_id: 1, event_type: 'potty', time: '21:00' },
        { id: 9, pet_id: 1, event_type: 'eat', time: '22:20' },
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));`
      )
    })
}
