const { Schema, model } = require("mongoose");
const Joi = require("joi");

// Регулярний вираз для email
const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

// Описуємо схему моделі mongoose для колекції contacts
const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

// Описуємо схеми Joi тіла запиту
// Схема для реєстрації i логіну
const signupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const joiSchemas = {
  signup: signupSchema,
  login: loginSchema,
  email: emailSchema,
};

const User = model("user", userSchema);

module.exports = { User, joiSchemas };
