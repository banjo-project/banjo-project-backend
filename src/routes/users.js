const express = require('express')
const router = express.Router({ mergeParams: true })
const ctrl = require('../controllers/users')

router.post('/users', ctrl.createUser)
router.get('/users', ctrl.getAllUsers)
router.get('/pets', ctrl.getAllPets)
router.get('/pets/:petId', ctrl.getPetInfo)
router.get('/pets/:petId/users', ctrl.getUsersForPet)
router.get('/pets/:petId/events', ctrl.getAllEvents)
router.get('/pets/:petId/completed_events', ctrl.getAllCompletedEvents)
router.post('/pets/:petId/events', ctrl.createEvent)
router.post('/events/:eventId/users/:userId', ctrl.createCompletedEvent)
router.delete('/pets/:petId/events', ctrl.deleteAllEvents)

module.exports = router
