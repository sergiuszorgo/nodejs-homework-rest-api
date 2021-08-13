const express = require('express')
const router = express.Router()
const controller = require('../../controllers/users')
const guard = require('../../helpers/guard')
const { validationRegistrationUser, validationUserLogin } = require('../../validation/users')

router.post('/signup', validationRegistrationUser, controller.register)
router.post('/login', validationUserLogin, controller.login)
router.post('/logout', guard, controller.logout)
router.get('/current', guard, controller.current)

module.exports = router
