
exports.up = function(knex) {
    return knex.schema.createTable('events', table => {
      table.increments()
      table.integer('pet_id').references('pets.id').onDelete('CASCADE').notNullable()
      table.enu('event_type', ['WALK', 'POTTY', 'EAT', 'EXCERCISE', 'TREATS', 'GROOM', 'MEDS', 'CRATE' ]).notNullable()
      table.string('note').nullable()
      table.integer('time').notNullable()
      table.timestamps(true, true)
    })
  };
    
exports.down = function(knex) {
   return knex.schema.dropTableIfExists('events')
};
    