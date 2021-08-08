const { Schema, model, SchemaTypes } = require('mongoose')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, 'Set name'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {},
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
  },
)

const Contact = model('contact', contactSchema)

module.exports = Contact
