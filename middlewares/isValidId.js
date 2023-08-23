const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
	const { contactId, userId } = req.params;
	console.log("contactId, userId  :>> ", contactId, userId);
	if (
		(contactId && !isValidObjectId(contactId)) ||
		(userId && !isValidObjectId(userId))
	) {
		next(HttpError(400, `Id is not valid`));
	}
	next();
};

module.exports = isValidId;
