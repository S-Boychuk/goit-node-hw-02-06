const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const contactSchema = Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addContactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email(),
	phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
	favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const schemas = {
	addContactSchema,
	updateFavoriteSchema,
};

const Contact = model("Contact", contactSchema);

module.exports = { Contact, schemas };
