import type { Response, NextFunction } from "express";
import Card from "../models/Card.js";
import Wallet from "../models/Wallet.js";
import {
	generateCardNumber,
	generateCVV,
	generateExpiryDate,
} from "../utils/cardHelpers.js";
import type { AuthRequest } from "../types/index.js";

export const getCards = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const cards = await Card.find({
			userId: req.user!.userId,
			isActive: true,
		}).select("-cardNumber -cvv");

		res.json({ cards });
	} catch (error) {
		next(error);
	}
};

export const createCard = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { cardName, cardType, cardBrand, currency } = req.body;

		if (!cardName || !cardType || !cardBrand || !currency) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// Check if wallet exists
		const wallet = await Wallet.findOne({
			userId: req.user!.userId,
			currency: currency.toUpperCase(),
			isActive: true,
		});

		if (!wallet) {
			return res
				.status(404)
				.json({ message: "Wallet not found for this currency" });
		}

		const cardFee = cardType === "physical" ? 10 : 2; // USD

		if (wallet.balance < cardFee) {
			return res
				.status(400)
				.json({ message: "Insufficient balance for card fee" });
		}

		const card = new Card({
			userId: req.user!.userId,
			cardName,
			cardType,
			cardBrand,
			cardNumber: generateCardNumber(cardBrand),
			expiryDate: generateExpiryDate(),
			cvv: generateCVV(),
			currency: currency.toUpperCase(),
			fee: cardFee,
		});

		await card.save();

		// Deduct fee from wallet
		wallet.balance -= cardFee;
		await wallet.save();

		res.status(201).json({
			message: "Card created successfully",
			card: {
				id: card._id,
				cardName: card.cardName,
				cardType: card.cardType,
				cardBrand: card.cardBrand,
				currency: card.currency,
				balance: card.balance,
				fee: card.fee,
				maskedNumber: `****-****-****-${card.cardNumber.slice(-4)}`,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const toggleCardStatus = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const { isActive } = req.body;

		const card = await Card.findOneAndUpdate(
			{ _id: id, userId: req.user!.userId },
			{ isActive },
			{ new: true }
		).select("-cardNumber -cvv");

		if (!card) {
			return res.status(404).json({ message: "Card not found" });
		}

		res.json({
			message: `Card ${
				isActive ? "activated" : "deactivated"
			} successfully`,
			card,
		});
	} catch (error) {
		next(error);
	}
};
