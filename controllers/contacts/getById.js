const { Contact } = require("../../models/contacts");
const createError = require("../../helpers/createError");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId, "-createdAt -updatedAt");
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
