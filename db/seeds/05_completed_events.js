exports.seed = function (knex) {
  return knex('completed_events').del()
    .then(function () {
      return knex('completed_events').insert([
        { id: 1, event_id: 1, user_id: 1, completed_time: '09:30 AM', image: 'https://www.petmd.com/sites/default/files/over-active-dog-211592482.jpg', comment: 'We went to Seattle Center! Banjo has been a good boi. need to give him lots of treats <3' },
        { id: 2, event_id: 2, user_id: 1, completed_time: '09:30 AM' },
        { id: 3, event_id: 3, user_id: 2, completed_time: '11:00 AM', image: 'https://cdn3-www.dogtime.com/assets/uploads/gallery/west-highland-white-terrier-dogs-and-puppies/west-highland-white-terrier-dogs-puppies-2.jpg', comment: 'played with Merlin:)' }
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('completed_events_id_seq', (SELECT MAX(id) FROM completed_events));`
      )
    })
}
