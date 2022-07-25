const { Schema, model } = require("mongoose");
const Joi = require("joi");

// Описуємо схеми тіла запиту
// Схема дл додавання контакту
const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

// Схема для оновлення favorite
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

// Описуємо схему моделі для колекції contacts
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiShemas = {
  add: addSchema,
  updateFavorite: updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiShemas };
