const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { basedir } = global;

const { User } = require(`${basedir}/models/users`);

const avatarsDir = path.join(basedir, "public", "avatars");

const setAvatar = async (req, res) => {
  // Беремо шлях і ім"я аватарки, де вона зараз знаходиться
  const { path: tempPath, originalname } = req.file;
  // Беремо _id юзера з req.users
  const { _id } = req.user;
  // Робимо унікальне ім"я
  const imageName = `${_id}_${originalname}`;
  // Оброблюємо пакетом Jimp
  const avatar = await Jimp.read(tempPath);
  await avatar.resize(250, 250).write(tempPath);

  try {
    // Створюємо новий шлях аватарки, де вона буде знаходитись
    const uploudPath = path.join(avatarsDir, imageName);
    // Переміщуємо її
    await fs.rename(tempPath, uploudPath);

    // Запам"ятовуємо цей шлях, записуємо в базу
    const avatarURL = path.join("avatars", imageName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    // Повертаємо цей шлях до аватарки
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempPath);
    throw error;
  }
};

module.exports = setAvatar;
