const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
	host: "smtp.meta.ua",
	port: 465,
	secure: true,
	auth: {
		user: "s.boichuk@meta.ua",
		pass: META_PASSWORD,
	},
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendMail = async (data) => {
	const email = { ...data, from: "s.boichuk@meta.ua" };
	await transport.sendMail(email);
	return true;
};

module.exports = sendMail;
