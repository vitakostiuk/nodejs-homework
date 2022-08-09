const multer = require("multer");
const path = require("path");

// Файл буде зберігатися в даній папці
const tempDir = path.join(__dirname, "../", "temp");

// Створюємо конфігурацію multer
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Створюємо мідлвару multer
const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
