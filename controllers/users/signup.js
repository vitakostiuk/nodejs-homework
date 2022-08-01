const bcrypt = require("bcryptjs");
const { basedir } = global;
const { User, joiSchemas } = require(`${basedir}/models/users`);
const createError = require("../../helpers/createError");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, `${email} in use`);
    }

    const { error } = joiSchemas.signup.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    // Хешуємо пароль
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
