const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const result = contacts.find((item) => item.id === contactId);
	return result || null;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) return null;
	const [result] = contacts.splice(index, 1);
	await updateContacts(contacts);
	return result;
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();

	if (contacts.some((contact) => contact.name === name)) {
		console.log(`Contact "${name}" is already exist.`);
		return null;
	}

	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};

	contacts.push(newContact);
	await updateContacts(contacts);
	return newContact;
};

const updateContactById = async (contactId, data) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);

	if (index === -1) {
		return null;
	}
	contacts[index] = { id: contactId, ...data };
	await updateContacts(contacts);
	return contacts[index];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContactById,
};
