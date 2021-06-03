const express = require("express");
const router = express.Router();
const Contacts = require("../../model");
const {
  validationCreateContact,
  validationUpdateContact,
} = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const result = await Contacts.listContacts();
    return res.json({ status: "succes", code: 200, data: { result } });
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await Contacts.getContactById(req.params.contactId);
    if (result) {
      return res.json({ status: "succes", code: 200, data: { result } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (err) {
    next(err);
  }
});

router.post("/", validationCreateContact, async (req, res, next) => {
  try {
    const result = await Contacts.addContact(req.body);
    res.status(201).json({ status: "succes", code: 201, data: { result } });
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await Contacts.removeContact(req.params.contactId);
    if (result) {
      return res.json({ status: "succes", code: 200, data: { result } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (err) {
    next(err);
  }
});

router.patch("/:contactId", validationUpdateContact, async (req, res, next) => {
  try {
    const result = await Contacts.updateContact(req.params.contactId, req.body);
    if (result) {
      return res.json({ status: "succes", code: 200, data: { result } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
