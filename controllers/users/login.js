const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { basedir } = global;
const { User, joiSchemas } = require(`${basedir}/models/users`);
const createError = require(`${basedir}/helpers/createError`);

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    // Валідація обов"язкових полів
    const { error } = joiSchemas.login.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    const { email, password } = req.body;
    // В модели User найти пользователя по email
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, "Email or password is wrong");
    }

    // сравнить пароль для найденного юзера
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw createError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
