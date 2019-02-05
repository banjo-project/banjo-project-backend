
exports.up = function(knex) {
    return knex.schema.createTable('users_pets', table => {
      table.increments()
      table.integer('user_id').references('users.id').onDelete('CASCADE').notNullable()
      table.integer('pet_id').references('pets.id').onDelete('CASCADE').notNullable()
    })
  };
    
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users_pets')
};
    