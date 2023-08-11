const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addContactSchema), ctrl.addNewContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put(
	"/:contactId",
	validateBody(schemas.addContactSchema),
	ctrl.updateContactById
);

module.exports = router;
