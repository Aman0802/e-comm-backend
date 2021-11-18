const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { DatabaseError } = require("sequelize");

const { User } = require("../database/models");

exports.loginController = async (req, res, next) => {
	const { userEmail, password } = req.body;

	try {
		if (!userEmail || !password) {
			throw new Error("Email or password cannot be empty.");
		}

		const user = await User.findByPk(userEmail);
		if (user) {
			// validate password
			const validPassword = await user.validatePassword(password);
			if (validPassword) {
				const token = await jwt.sign(
					{
						email: user.email,
						role: user.role,
					},
					process.env.USER_JWT_SECRET
				);

				res.status(200).send({
					code: 200,
					status: true,
					message: "Logged in Successfully",
					data: {
						accessToken: token,
					},
				});
			} else {
				throw new Error("Email or password is incorrect.");
			}
		} else {
			throw new Error("User does not exists.");
		}
	} catch (err) {
		if (err instanceof DatabaseError) {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		} else {
			const error = new Error(err);
			error.httpStatusCode = 400;
			return next(error);
		}
	}
};

exports.registerController = async (req, res, next) => {
	const { userEmail, password, role } = req.body;

	try {
		if (!userEmail || !password) {
			throw new Error("Email or password cannot be empty.");
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		console.log("hashed password", hashedPassword);
		await User.create({
			email: userEmail,
			password: hashedPassword,
			role,
		});

		res.status(200).send({
			code: 200,
			status: true,
			message: "User created Successfully",
		});
	} catch (err) {
		if (err instanceof DatabaseError) {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		} else {
			const error = new Error(err);
			error.httpStatusCode = 400;
			return next(error);
		}
	}
};
