const express = require("express");

// import controllers
const ctrl = require("../../controllers/contacts");

// Метод Router(); створює міні-додаток, в якому можна зберігати маршрути
const router = express.Router();

// Описуємо маршрути і оброблювачі запиту
router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", ctrl.updateById);

router.patch("/:contactId/favorite", ctrl.updateStatusContact);

module.exports = router;
