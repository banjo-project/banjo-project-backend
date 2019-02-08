const userModel = require('../models/users')

const getAllUsers = (req, res, next) => {
  userModel.getAllUsers()
    .then((data) => res.send({ data }))
    .catch(next)
}

async function createUser (req, res, next) {
  try {
    if (!req.body.username && !req.body.password && !req.body.email && req.body.petName && req.body.petSex && req.body.petBirthday) {
      return next({ status: 400, message: 'Bad Request' })
    }
    const pet = await userModel.getOnePet(req.body.petName, req.body.petSex, req.body.petBirthday)
    if (!pet) {
      const [petData] = await userModel.createPet(req.body.petName, req.body.petBirthday, req.body.petBreed, req.body.petSex, req.body.petImg)
      const data = await userModel.createUser(petData.id, req.body.username, req.body.password, req.body.email, req.body.phone_number, req.body.title)
      return res.status(201).send({ data })
    }
    const data = await userModel.createUser(pet.id, req.body.username, req.body.password, req.body.email, req.body.phone_number, req.body.title)
    return res.status(201).send({ data })
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

async function getAllEvents (req, res, next) {
  try {
    const data = await userModel.getAllEvents(req.params.petId)
    return res.status(201).send({ data })
  } catch (err) {
    return next({ status: 400, message: err })
  }
}

module.exports = {
  getAllUsers,
  createUser,
  getUsersForPet,
  getPetInfo,
  getAllEvents
}
