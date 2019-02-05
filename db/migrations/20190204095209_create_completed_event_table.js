exports.up = function(knex) {
    return knex.schema.createTable('completed_events', table => {
      table.increments()
      table.integer('event_id').references('events.id').onDelete('CASCADE').notNullable()
      table.integer('user_id').references('users.id').onDelete('CASCADE').notNullable()
      table.string('comment')
      table.timestamps(true, true)
    })
  };
    
exports.down = function(knex) {
   return knex.schema.dropTableIfExists('completed_events')
};
    