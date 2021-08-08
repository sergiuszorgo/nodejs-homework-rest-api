const express = require('express')
const router = express.Router()
const controller = require('../../controllers/users')

router.post('/signup', controller.register)
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.get('/current', controller.current)
router.patch('/', controller.update)

module.exports = router
