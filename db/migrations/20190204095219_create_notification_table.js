
exports.up = function (knex) {
  return knex.schema.createTable('notifications', table => {
    table.increments()
    table.integer('event_id').references('events.id').onDelete('CASCADE').notNullable()
    table.integer('sender_id').references('users.id').onDelete('CASCADE').notNullable()
    table.integer('receiver_id').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notifications')
}
