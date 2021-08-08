const express = require('express')
const router = express.Router()
const controller = require('../../controllers/contacts')
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('../../validation/contacts')

router.get('/', controller.listContacts)

router.post('/', validationCreateContact, controller.addContact)

router.get('/:contactId', controller.getContactById)

router.put('/:contactId', validationUpdateContact, controller.updateContact)

router.delete('/:contactId', controller.removeContact)

router.patch('/:contactId/favorite', validationUpdateStatusContact, controller.updateContact)

module.exports = router
