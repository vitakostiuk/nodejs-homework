const express = require("express");

// import middleware for authorization
const { login } = require("../../middlewares");

// import controllers
const ctrl = require("../../controllers/contacts");

// Метод Router(); створює міні-додаток, в якому можна зберігати маршрути
const router = express.Router();

// Описуємо маршрути і оброблювачі запиту
router.get("/", login, ctrl.getAll);

router.get("/:contactId", login, ctrl.getById);

router.post("/", login, ctrl.add);

router.delete("/:contactId", login, ctrl.removeById);

router.put("/:contactId", login, ctrl.updateById);

router.patch("/:contactId/favorite", login, ctrl.updateStatusContact);

module.exports = router;
