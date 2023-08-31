const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
	const { contactId, userId } = req.params;
	if (
		(contactId && !isValidObjectId(contactId)) ||
		(userId && !isValidObjectId(userId))
	) {
		next(HttpError(400, `Id is not valid`));
	}
	next();
};

module.exports = isValidId;
