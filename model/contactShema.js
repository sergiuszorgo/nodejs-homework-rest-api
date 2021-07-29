const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
  name: {
    type: String,
    require: [true, 'Set name'],
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const Contact = model('contact', contactSchema)

module.exports = Contact
