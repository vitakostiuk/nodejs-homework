const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// connect to database
require("dotenv").config();

global.basedir = __dirname;

//  імпортуємо роутери
const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

// Створюємо веб-сервер
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// ---1--- Описуємо мідлвари
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
// Якщо приходить запит за статичним файлом,шукай його в папці public. Віддає файл на фронтенд
app.use(express.static("public"));

// ---2--- Створюємо групу маршрутів
// Вкауємо експресу, що всі запити, які будуть починатися з api/users і /api/contacts, треба шукати тут
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

// ---3--- Створюємо обробники помилок
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
