
exports.up = function (knex) {
  return knex.schema.createTable('events', table => {
    table.increments()
    table.integer('pet_id').references('pets.id').onDelete('CASCADE').notNullable()
    table.enu('event_type', [ 'walk', 'potty', 'eat', 'exercise', 'treats', 'groom', 'meds', 'crate' ]).notNullable()
    table.string('time').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('events')
}
