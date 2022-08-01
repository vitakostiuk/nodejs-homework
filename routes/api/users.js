const express = require("express");

const { login } = require("../../middlewares");

// import controllers
const ctrl = require("../../controllers/users");
console.log(ctrl);

// Метод Router(); створює міні-додаток, в якому можна зберігати маршрути
const router = express.Router();

// Описуємо маршрути і оброблювачі запиту

// register
router.post("/signup", ctrl.signup);

// signin-login
router.post("/login", ctrl.login);

// logout
router.get("/logout", login, ctrl.logout);

// current user
router.get("/current", login, ctrl.getCurrent);

module.exports = router;
