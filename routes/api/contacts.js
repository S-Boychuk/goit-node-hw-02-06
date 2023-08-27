const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
	"/",
	authenticate,
	validateBody(schemas.addContactSchema),
	ctrl.addNewContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContactById);

router.put(
	"/:contactId",
	authenticate,
	isValidId,
	validateBody(schemas.addContactSchema),
	ctrl.updateContactById
);

router.patch(
	"/:contactId/favorite",
	authenticate,
	isValidId,
	validateBody(schemas.updateFavoriteSchema),
	ctrl.updateFavorite
);

module.exports = router;
