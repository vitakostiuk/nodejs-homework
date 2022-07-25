const express = require("express");
const Joi = require("joi");
const createError = require("../../helpers/createError");

const contactsJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  phone: Joi.string().required(),
});

// Імпортуємо об"єкт contactsб в якому є функції для роботи з контактами
const contacts = require("../../models/contacts");

// Метод Router(); створює міні-додаток, в якому можна зберігати маршрути
const router = express.Router();

// Описуємо маршрути і оброблювачі запиту
router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "Missing required name field");
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    console.log(contactsJoiSchema.validate(req.body));
    const { error } = contactsJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "Missing fields");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
