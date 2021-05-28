const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string().min(7).max(13).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: [
          "gmail",
          "yandex",
          "mail",
          "com",
          "net",
          "ru",
          "uk",
          "io",
          "co",
          "ua",
        ],
      },
    })
    .optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),

  phone: Joi.string().min(7).max(13).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: [
          "gmail",
          "yandex",
          "mail",
          "com",
          "net",
          "ru",
          "uk",
          "io",
          "co",
          "ua",
        ],
      },
    })
    .optional(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: "missing fields",
    });
  }
};

module.exports = {
  validationCreateContact: (req, _, next) => {
    return validate(schemaCreateContact, req.body, next);
  },
  validationUpdateContact: (req, _, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
};
