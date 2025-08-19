import { Document, Types } from "mongoose";
import type { Request } from "express";

export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	finpayTag: string;
	phone?: string;
	dateOfBirth?: Date;
	country?: string;
	occupation?: string;
	address?: string;
	avatar?: string;
	isEmailVerified: boolean;
	isPhoneVerified: boolean;
	kycStatus: "pending" | "verified" | "rejected";
	twoFactorEnabled: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IWallet extends Document {
	userId: Types.ObjectId;
	currency: "USD" | "GBP" | "EUR" | "NGN";
	balance: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface ITransaction extends Document {
	userId: Types.ObjectId;
	type: "send" | "receive" | "convert" | "fund";
	fromWallet?: Types.ObjectId;
	toWallet?: Types.ObjectId;
	amount: number;
	currency: string;
	fee: number;
	status: "pending" | "processing" | "completed" | "failed" | "refunded";
	reference: string;
	description?: string;
	beneficiaryId?: Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

export interface IInvoice extends Document {
	userId: Types.ObjectId;
	invoiceNumber: string;
	customerName: string;
	customerEmail: string;
	billingAddress: string;
	items: Array<{
		description: string;
		quantity: number;
		rate: number;
		amount: number;
	}>;
	subtotal: number;
	tax: number;
	total: number;
	currency: string;
	status: "draft" | "pending" | "processing" | "paid" | "due" | "overdue";
	dueDate: Date;
	paidAt?: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICard extends Document {
	userId: Types.ObjectId;
	cardName: string;
	cardType: "virtual" | "physical";
	cardBrand: "visa" | "mastercard";
	cardNumber: string;
	expiryDate: string;
	cvv: string;
	currency: string;
	balance: number;
	isActive: boolean;
	fee: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IBeneficiary extends Document {
	userId: Types.ObjectId;
	name: string;
	email?: string;
	accountNumber?: string;
	bankName?: string;
	finpayTag?: string;
	type: "finpay" | "bank" | "international";
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface INotification extends Document {
	userId: Types.ObjectId;
	title: string;
	message: string;
	type: "transaction" | "invoice" | "security" | "system";
	isRead: boolean;
	actionUrl?: string;
	createdAt: Date;
}

export interface IExchangeRate extends Document {
	fromCurrency: string;
	toCurrency: string;
	buyRate: number;
	sellRate: number;
	lastUpdated: Date;
}

export interface AuthRequest extends Request {
	user?: {
		userId: string;
		email: string;
	};
}
