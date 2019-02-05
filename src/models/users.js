const knex = require('../../db/index')
const bcrypt = require('bcrypt')

function getUserByEmail(email){
    return (
      knex('users')
        .where({ "email":email })
        .first()
    )
}

module.exports = {
    getUserByEmail
}