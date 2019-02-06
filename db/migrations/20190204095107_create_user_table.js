
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments()
      table.string('email').notNullable().unique()
      table.text('password').notNullable()
      table.string('username').notNullable()
      table.bigInteger('phone_number').unique()
      table.string('title').nullable()
    })
  };
    
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
    