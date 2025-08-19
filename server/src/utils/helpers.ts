import crypto from "crypto";
import User from "../models/User.js";
import Invoice from "../models/Invoice.js";
import jwt from "jsonwebtoken";

export const generateReference = (): string => {
	return (
		"FP" + Date.now() + crypto.randomBytes(4).toString("hex").toUpperCase()
	);
};

export const generateFinpayTag = async (
	firstName: string,
	lastName: string
): Promise<string> => {
	const baseTag = (firstName + lastName)
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "");
	let tag = baseTag;
	let counter = 1;

	while (await User.findOne({ finpayTag: tag })) {
		tag = baseTag + counter;
		counter++;
	}

	return tag;
};

export const generateInvoiceNumber = async (): Promise<string> => {
	const year = new Date().getFullYear();
	const count = await Invoice.countDocuments({
		createdAt: {
			$gte: new Date(year, 0, 1),
			$lt: new Date(year + 1, 0, 1),
		},
	});

	return `INV-${year}-${String(count + 1).padStart(4, "0")}`;
};

export const generateTokens = (userId: string, email: string) => {
	const accessToken = jwt.sign({ userId, email }, process.env.JWT_SECRET!, {
		expiresIn: "15m",
	});

	const refreshToken = jwt.sign(
		{ userId, email },
		process.env.JWT_REFRESH_SECRET!,
		{ expiresIn: "7d" }
	);

	return { accessToken, refreshToken };
};
