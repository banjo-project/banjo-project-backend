const userModel = require('../models/users')

const getAllUsers = (req, res, next) => {
  userModel.getAllUsers()
    .then((data) => res.send({ data }))
    .catch(next)
}

const getAllPets = (req, res, next) => {
  userModel.getAllPets()
    .then((data) => res.send({ data }))
    .catch(next)
}

const getPetUserInfo = (req, res, next) => {
  userModel.getPetUserInfo(req.params.userId)
    .then(([data]) => res.send({ data }))
    .catch(next)
}

async function createUser (req, res, next) {
  try {
    if (!req.body.username && !req.body.password && !req.body.email) {
      return next({ status: 400, message: 'Bad Request' })
    } if (!req.body.petId) {
      const petData = await userModel.createPet(req.body.petName, req.body.petBirthday, req.body.petBreed, req.body.petImg, req.body.petSex)
      const userData = await userModel.createUser(petData.id, req.body.username, req.body.password, req.body.email, req.body.image, req.body.title)
      return res.status(201).send({ userData })
    } else {
      const userData = await userModel.createUser(req.body.petId, req.body.username, req.body.password, req.body.email, req.body.image, req.body.title)
      return res.status(201).send({ userData })
    }
  } catch (err) {
    return next({ status: 400, message: err })
  }
}

async function getUsersForPet (req, res, next) {
  try {
    const data = await userModel.getUsersForPet(req.params.petId)
    return res.status(201).send({ data })
  } catch (err) {
    return next({ status: 400, message: err })
  }
}

async function getPetInfo (req, res, next) {
  try {
    const data = await userModel.getPetInfo(req.params.petId)
    return res.status(201).send({ data })
  } catch (err) {
    return next({ status: 400, message: err })
  }
}

async function getPetInfoAndEvents (req, res, next) {
  try {
    const petInfo = await userModel.getPetInfo(req.params.petId)
    const petEvents = await userModel.getAllEvents(req.params.petId)
    return res.status(201).send({ ...petInfo, events: petEvents})
  } catch (err) {
    throw Error (err)
  }
}

async function getAllEvents (req, res, next) {
  try {
    const data = await userModel.getAllEvents(req.params.petId)
    return res.status(201).send({ data })
  } catch (err) {
    return next({ status: 400, message: err })
  }
}

async function getAllCompletedEvents (req, res, next) {
  try {
    const data = await userModel.getAllCompletedEvents(req.params.petId, req.body.event_type, req.body.time)
    return res.status(201).send({ data })
  } catch (err) {
    return next({ status: 400, message: err })
  }
}

async function createEvent (req, res, next) {
  try {
    if (!req.params.petId && !req.body.event_type && !req.body.time) {
      return next({ status: 400, message: 'Bad Request' })
    } const data = await userModel.createEvent(req.params.petId, req.body.event_type, req.body.time)
    return res.status(201).send({ data })
  } catch (err) {
    return next({ status: 400, message: err })
  }
}

async function createCompletedEvent (req, res, next) {
  try {
    if (!req.params.eventId && !req.params.userId && !req.body.completed_time) {
      return next({ status: 400, message: 'Bad Request' })
    } const data = await userModel.createCompletedEvent(req.params.eventId, req.params.userId, req.body.completed_time, req.body.comment, req.body.image)
    return res.status(201).send({ data })
  } catch (err) {
    return next({ status: 400, message: err })
  }
}

async function deleteAllEvents (req, res, next) {
  try {
    const data = await userModel.deleteAllEvents(req.params.petId)
    return res.status(201).send({ data })
  } catch (err) {
    return next({ status: 400, message: err })
  }
}

module.exports = {
  getAllUsers,
  getAllPets,
  getPetInfoAndEvents,
  getPetUserInfo,
  createUser,
  getUsersForPet,
  getPetInfo,
  getAllEvents,
  getAllCompletedEvents,
  createEvent,
  createCompletedEvent,
  deleteAllEvents
}