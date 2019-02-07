const express = require('express')
const router = express.Router({ mergeParams: true })
const ctrl = require('../controllers/users')

router.post('/users', ctrl.createUser)
router.get('/users', ctrl.getAllUsers)
router.get('/pets/:petId', ctrl.getPetInfo)
router.get('/pets/:petId/users', ctrl.getUsersForPet)
router.get('/pets/:petId/events', ctrl.getAllEvents)

module.exports = router
