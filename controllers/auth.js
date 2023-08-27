const { User } = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Email has been already in use");
	}

	const hashPassword = await bcryptjs.hash(password, 10);

	const newUser = await User.create({ ...req.body, password: hashPassword });

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email or password invalid");
	}
	const passwordCompare = await bcryptjs.compare(password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, "Email or password invalid");
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
	await User.findByIdAndUpdate(user._id, { token });

	res.status(200).json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
};

const getCurrent = async (req, res) => {
	const { email, subscription } = req.user;

	res.json({
		email,
		subscription,
	});
};

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).end();
};

const updateUser = async (req, res) => {
	console.log("req.params :>> ", req.params);
	const { userId } = req.params;

	const result = await User.findByIdAndUpdate(userId, req.body, {
		new: true,
	});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	getCurrent: ctrlWrapper(getCurrent),
	logout: ctrlWrapper(logout),
	updateUser: ctrlWrapper(updateUser),
};
