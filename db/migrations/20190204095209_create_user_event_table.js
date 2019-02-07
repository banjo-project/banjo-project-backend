exports.up = function (knex) {
  return knex.schema.createTable('users_events', table => {
    table.increments()
    table.integer('event_id').references('events.id').onDelete('CASCADE').notNullable()
    table.integer('user_id').references('users.id').onDelete('CASCADE').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users_events')
}
