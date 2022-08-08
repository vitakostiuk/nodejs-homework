const path = require("path");
const fs = require("fs/promises");

const { basedir } = global;

const { User } = require(`${basedir}/models/users`);

const avatarsDir = path.join(basedir, "public", "avatars");

const setAvatar = async (req, res) => {
  try {
    // Беремо _id юзера з req.users
    const { _id } = req.user;
    // Беремо шлях і ім"я аватарки, де вона зараз знаходиться
    const { path: tempPath, originalname } = req.file;

    // Робимо унікальне ім"я
    const [extention] = originalname.split(".").reverse();
    const newName = `${_id}.${extention}`;

    // Створюємо новий шлях аватарки, де вона буде знаходитись
    const uploudPath = path.join(avatarsDir, newName);
    // Переміщуємо її
    await fs.rename(tempPath, uploudPath);

    // Запам"ятовуємо цей шлях, записуємо в базу
    const avatarURL = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    // Повертаємо цей шлях до аватарки
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = setAvatar;
