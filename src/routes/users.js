const express = require('express')
const router = express.Router({ mergeParams: true })
const ctrl = require('../controllers/users')

router.post('/users', ctrl.createUser)
router.get('/users', ctrl.getAllUsers)

module.exports = router
