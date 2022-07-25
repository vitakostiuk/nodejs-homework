const { Contact, joiShemas } = require("../../models/contacts");
const createError = require("../../helpers/createError");

const updateById = async (req, res, next) => {
  try {
    const { error } = joiShemas.add.validate(req.body);
    if (error) {
      throw createError(400, "Missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
