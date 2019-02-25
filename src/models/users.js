const knex = require('../../db/index')
const bcrypt = require('bcrypt')

function getUserByEmail (email) {
  return knex('users')
    .where({ 'email': email })
    .first()
}

const getAllUsers = () => knex('users')

const getAllPets = () => knex('pets')

function getPetUserInfo (userId) {
  return knex('pets')
    .join('users_pets', 'pet_id', 'pets.id')
    .where('users_pets.user_id', userId)
    .returning('*')
}

function getOnePet (petId) {
  return knex('pets')
    .where({ 'id': petId })
    .first()
}

function createUser (petId, username, password, email, image, title) {
  return getUserByEmail(email)
    .then(function (data) {
      if (data) throw { status: 400, message:'User already exists'}
      return bcrypt.hash(password, 10)
    })
    .then(function (password) {
      return (
        knex('users')
          .insert({ email, username, password, image, title })
          .returning('*')
      )
        .then(([data]) => {
          return knex('users_pets')
            .insert({ user_id: data.id, pet_id: petId })
            .returning('*')
        })
    })
    .then(function ([ data ]) {
      delete data.hashword
      return data
    })
}

function createPet (petName, petBirthday, petBreed, petImg, petSex) {
  return knex('pets')
    .insert({ name: petName, birthday: petBirthday, breed: petBreed, image: petImg, sex: petSex })
    .returning('*')
    .then(([data]) => data)
}

function getUsersForPet (petId) {
  return knex('users')
    .join('users_pets', 'user_id', 'users.id')
    .where('users_pets.pet_id', petId)
}

function getPetInfo (petId) {
  return knex('pets')
    .where({ 'id': petId })
    .first()
}

function getAllEvents (petId) {
  return knex('events')
    .select('events.*')
    .leftJoin('completed_events', 'events.id', 'completed_events.event_id')
    .where({
      'completed_events.completed_time': null,
      'events.pet_id': petId
    })
}

function getAllCompletedEvents (petId) {
  return knex('events')
    .where('events.pet_id', petId)
    .rightJoin('completed_events', 'events.id', 'completed_events.event_id')
}

function createEvent (petId, event_type, time) {
  return knex('events')
    .insert({ pet_id: petId, event_type: event_type, time: time })
    .returning('*')
}

function createCompletedEvent (eventId, userId, completed_time, comment, image) {
  return knex('completed_events')
    .insert({ event_id: eventId, user_id: userId, completed_time: completed_time, comment: comment, image: image })
    .returning('*')
}

function deleteAllEvents (petId) {
  return knex('events')
    .where({ 'pet_id': petId })
    .join('completed_event', 'event_id', 'events.id')
    .del()
}

module.exports = {
  getUserByEmail,
  getAllUsers,
  getAllPets,
  getPetUserInfo,
  getOnePet,
  createUser,
  createPet,
  getUsersForPet,
  getPetInfo,
  getAllEvents,
  getAllCompletedEvents,
  createEvent,
  createCompletedEvent, 
  deleteAllEvents
}
