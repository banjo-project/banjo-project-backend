
exports.seed = function (knex) {
  return knex('events').del()
    .then(function () {
      return knex('events').insert([
        { id: 1, pet_id: 1, event_type: 'walk', time: '08:00 AM' },
        { id: 2, pet_id: 1, event_type: 'potty', time: '08:00 AM' },
        { id: 3, pet_id: 1, event_type: 'walk', time: '11:10 AM' },
        { id: 4, pet_id: 1, event_type: 'walk', time: '05:20 PM' },
        { id: 5, pet_id: 1, event_type: 'potty', time: '05:20 PM' },
        { id: 6, pet_id: 1, event_type: 'eat', time: '06:00 PM' },
        { id: 7, pet_id: 1, event_type: 'walk', time: '09:00 PM' },
        { id: 8, pet_id: 1, event_type: 'potty', time: '09:00 PM' },
        { id: 9, pet_id: 1, event_type: 'eat', time: '10:20 PM' },
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));`
      )
    })
}
