const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addContactSchema), ctrl.addNewContact);

router.delete("/:contactId", isValidId, ctrl.deleteContactById);

router.put(
	"/:contactId",
	isValidId,
	validateBody(schemas.addContactSchema),
	ctrl.updateContactById
);

router.patch(
	"/:contactId/favorite",
	isValidId,
	validateBody(schemas.updateFavoriteSchema),
	ctrl.updateFavorite
);

module.exports = router;
