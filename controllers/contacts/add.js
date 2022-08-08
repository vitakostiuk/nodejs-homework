const { Contact, joiShemas } = require("../../models/contacts");
const createError = require("../../helpers/createError");

const add = async (req, res, next) => {
  try {
    const { error } = joiShemas.add.validate(req.body);
    if (error) {
      throw createError(400, "Missing required name field");
    }
    const { id: owner } = req.user;
    // console.log(req.user);
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
