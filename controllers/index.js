const Contacts = require('../repositories/contacts')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.getAllContacts()
    return res.status(200).json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      console.log(contact)
      return res.status(200).json({ status: 'success', code: 200, data: { contact } })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'error: Contact Not Found',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: { contact },
      })
    } else {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'error: missing required name field',
        data: 'missing required name field',
      })
    }
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: { contact },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'error: Contact Not Found',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    if (req.body) {
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        return res.status(200).json({ status: 'success', code: 200, data: { contact } })
      }
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'error: Contact Not Found',
        data: 'Not Found',
      })
    } else {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'error: missing fields',
        data: 'missing fields',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
