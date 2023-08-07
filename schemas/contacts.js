const Joi = require("joi");

const addContactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email(),
	phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
});

module.exports = {
	addContactSchema,
};
