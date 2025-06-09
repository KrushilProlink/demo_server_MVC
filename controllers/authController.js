const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) =>
	jwt.sign(
		{ id: user._id },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "1d" }
	);

const register = async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ error: "Email already registered" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			email,
			password: hashedPassword,
		});

		res.status(201).json({ success: true, message: "User registered successfully", data: newUser });
	} catch (error) {
		console.error("Register Error:", error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.toString()
		});
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ error: "Email is not exit" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ error: "Invalid password" });
		}

		const accessToken = generateAccessToken(user);

		res.status(200).json({
			success: true,
			message: "User logged in successfully",
			accessToken,
			user: {
				id: user._id,
				email: user.email,
			},
		});
	} catch (error) {
		console.error("Login Error:", error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.toString()
		});
	}
};

module.exports = { register, login };
