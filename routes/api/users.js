const express = require('express')
const router = express.Router()
const controller = require('../../controllers/users')
const guard = require('../../helpers/guard')
const upload = require('../../helpers/upload')
const { validationRegistrationUser, validationUserLogin } = require('../../validation/users')

router.post('/signup', validationRegistrationUser, controller.register)
router.post('/login', validationUserLogin, controller.login)
router.post('/logout', guard, controller.logout)
router.get('/current', guard, controller.current)
router.patch('/avatars', guard, upload.single('avatar'), controller.avatars)

module.exports = router
