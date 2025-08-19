import jwt from "jsonwebtoken";
import Joi from "joi";
import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import { generateFinpayTag, generateTokens } from "../utils/helpers.js";
import type { NextFunction, Request, Response } from "express";

const registerSchema = Joi.object({
	firstName: Joi.string().required().trim(),
	lastName: Joi.string().required().trim(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { error, value } = registerSchema.validate(req.body);
		if (error) {
			return res
				.status(400)
				.json({ message: error.details?.[0]?.message });
		}

		const { firstName, lastName, email, password } = value;

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Generate unique FinPay tag
		const finpayTag = await generateFinpayTag(firstName, lastName);

		// Create user
		const user = new User({
			firstName,
			lastName,
			email,
			password,
			finpayTag,
		});

		await user.save();

		// Create default wallets for all currencies
		const currencies = ["USD", "GBP", "EUR", "NGN"];
		await Promise.all(
			currencies.map((currency) =>
				new Wallet({ userId: user._id, currency }).save()
			)
		);

		const { accessToken, refreshToken } = generateTokens(
			user._id.toString(),
			email
		);

		res.status(201).json({
			message: "User registered successfully",
			user: {
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				finpayTag: user.finpayTag,
			},
			accessToken,
			refreshToken,
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { error, value } = loginSchema.validate(req.body);
		if (error) {
			return res
				.status(400)
				.json({ message: error.details?.[0]?.message });
		}

		const { email, password } = value;

		// Find user
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Verify password
		const isValidPassword = await user.comparePassword(password);
		if (!isValidPassword) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const { accessToken, refreshToken } = generateTokens(
			user._id.toString(),
			email
		);

		res.json({
			message: "Login successful",
			user: {
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				finpayTag: user.finpayTag,
				avatar: user.avatar,
				kycStatus: user.kycStatus,
			},
			accessToken,
			refreshToken,
		});
	} catch (error) {
		next(error);
	}
};

export const refreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			return res.status(401).json({ message: "Refresh token required" });
		}

		const decoded = jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET!
		) as any;
		const user = await User.findById(decoded.userId);

		if (!user) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const { accessToken, refreshToken: newRefreshToken } = generateTokens(
			user._id.toString(),
			user.email
		);

		res.json({
			accessToken,
			refreshToken: newRefreshToken,
		});
	} catch (error) {
		res.status(401).json({ message: "Invalid refresh token" });
	}
};

export const logout = (req: Request, res: Response) => {
	res.json({ message: "Logout successful" });
};
