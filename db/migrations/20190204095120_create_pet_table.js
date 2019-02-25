
exports.up = function (knex, Promise) {
  return knex.schema.createTable('pets', table => {
    table.increments()
    table.string('name').notNullable()
    table.string('birthday').nullable()
    table.string('breed').nullable()
    table.text('image')
    table.enu('sex', ['boy', 'girl']).notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('pets')
}
