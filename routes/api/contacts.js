const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const router = express.Router();

const { HttpError } = require("../../helpers");

const addContactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email(),
	phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
});

router.get("/", async (req, res, next) => {
	try {
		const result = await contacts.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contacts.getContactById(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = addContactSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const result = await contacts.addContact(req.body);
		if (!result) {
			throw HttpError(409, "Contact has been already exist");
		}
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contacts.removeContact(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json({
			message: "Delete success",
		});
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = addContactSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const { contactId } = req.params;
		console.log("router.put :>> ", contactId);
		const result = await contacts.updateContactById(contactId, req.body);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
