const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const userSchema = Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: [true, "Set password for user"],
			password: Joi.string().min(8).required(),
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: "",
		},
		avatarURL: {
			type: String,
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
});

const updateUserSchema = Joi.object({
	subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
	registerSchema,
	loginSchema,
	updateUserSchema,
};

const User = model("user", userSchema);

module.exports = {
	User,
	schemas,
};
