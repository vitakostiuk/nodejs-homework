const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find({}, "name email phone favorite");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
