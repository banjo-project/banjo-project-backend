
exports.up = function (knex, Promise) {
  return knex.schema.createTable('pets', table => {
    table.increments()
    table.string('name').notNullable()
    table.date('birthday').nullable()
    table.string('breed').nullable()
    table.string('image')
    table.enu('sex', ['boy', 'girl']).notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('pets')
}
