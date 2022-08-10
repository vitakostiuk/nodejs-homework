const { basedir } = global;
const { User } = require(`${basedir}/models/users`);
const { createError } = require(`${basedir}/helpers/createError`);

const verifyEmail = async (req, res) => {
  // Беремо verificationToken з параметрів запиту
  const { verificationToken } = req.params;
  // Шукаємо користувача з таким verificationToken
  const user = await User.findOne({ verificationToken });
  // Якщо людтна вже зареєструвалась або вже підтвердила
  if (!user) {
    throw createError(404);
  }
  await User.findIdAndUpdate(user._id, { verificationToken: "", verify: true });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
