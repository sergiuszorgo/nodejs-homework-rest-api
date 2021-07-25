const mongoose = require('mongoose')
require('dotenv').config()
const dbHost = process.env.DB_HOST

const dbase = mongoose.connect(dbHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
})

module.exports = dbase
