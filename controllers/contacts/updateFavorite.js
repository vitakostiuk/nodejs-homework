const { Contact, joiShemas } = require("../../models/contacts");
const createError = require("../../helpers/createError");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = joiShemas.updateFavorite.validate(req.body);
    if (error) {
      throw createError(400, "missing field favorite");
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

module.exports = updateStatusContact;
