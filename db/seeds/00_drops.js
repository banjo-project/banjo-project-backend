
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('notifications').del()
    .then(() => knex('users_events').del())
    .then(() => knex('events').del())
    .then(() => knex('users_pets').del())
    .then(() => knex('pets').del())
    .then(() => knex('users').del())
}
