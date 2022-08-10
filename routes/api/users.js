const express = require("express");

const { login, upload } = require("../../middlewares");

// import controllers
const ctrl = require("../../controllers/users");
// console.log(ctrl);

// Метод Router(); створює міні-додаток, в якому можна зберігати маршрути
const router = express.Router();

// Описуємо маршрути і оброблювачі запиту

// register
router.post("/signup", ctrl.signup);

// verification
router.get("/verify/:verificationToken", ctrl.verifyEmail);

// resend verify email
router.post("/verify", ctrl.resendVerifyEmail);

// signin-login
router.post("/login", ctrl.login);

// logout
router.get("/logout", login, ctrl.logout);

// current user
router.get("/current", login, ctrl.getCurrent);

// Додавання аватару. upload.single("avatar") означає - візьми один файл з поля avatar, який прийшов в реквест боді
router.patch("/avatars", login, upload.single("avatar"), ctrl.setAvatar);

module.exports = router;
