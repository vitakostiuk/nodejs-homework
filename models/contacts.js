const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

/* TODO: 
1. get all contacts
2. get contact by ID
3. remove contact
4. add contact
*/
async function listContacts() {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = { listContacts, getContactById, addContact, removeContact };

// // const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
