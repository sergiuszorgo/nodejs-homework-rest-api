const Joi = require('joi')

const schemaUserRegistration = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().alphanum().min(6).max(25).required(),
})

const schemaUserLogin = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().alphanum().min(6).max(25).required(),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    next({
      status: 400,
      message: 'Bad Request',
      data: 'Bad Request',
    })
  }
}

module.exports = {
  validationRegistrationUser: (req, res, next) => {
    return validate(schemaUserRegistration, req.body, next)
  },
  validationUserLogin: (req, res, next) => {
    return validate(schemaUserLogin, req.body, next)
  },
}
