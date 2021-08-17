const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(express.static(path.join(__dirname, AVATAR_OF_USERS)))
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

module.exports = app
