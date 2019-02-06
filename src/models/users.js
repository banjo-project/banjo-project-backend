const knex = require('../../db/index')
const bcrypt = require('bcrypt')

function getUserByEmail (email) {
  return (
    knex('users')
      .where({ 'email': email })
      .first()
  )
}

const getAllUsers = () => knex('users')

function getOnePet (petName, petSex, petBirthday) {
  return (
    knex('pets')
      .where({ 'name': petName, 'sex': petSex, 'birthday': petBirthday })
      .first()
  )
}

function createUser (pet_id, username, password, email, phone_number, title) {
  return getUserByEmail(email)
    .then(function (data) {
      if (data) throw { status: 400, message:'User already exists'}
      return bcrypt.hash(password, 10)
    })
    .then(function (password) {
      return (
        knex('users')
          .insert({ email, username, password, phone_number, title })
          .returning('*')
      )
        .then(([data]) => {
          return knex('users_pets')
            .insert({ user_id: data.id, pet_id: pet_id })
            .returning('*')
        })
    })
    .then(function ([ data ]) {
      delete data.hashword
      return data
    })
}

function createPet (petName, petBirthday, petBreed, petImg, petSex) {
  return (
    knex('pets')
      .insert({ name: petName, birthday: petBirthday, breed: petBreed, image: petImg, sex: petSex })
      .returning('*')
  )
}

module.exports = {
  getUserByEmail,
  getAllUsers,
  getOnePet,
  createUser,
  createPet
}
