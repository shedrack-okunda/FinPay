export interface User {
	firstName: string;
	lastName: string;
	email: string;
	finpayTag: string;
	phone?: string;
	dateOfBirth?: string;
	country?: string;
	occupation?: string;
	address?: string;
	avatar?: string;
	kycStatus: "pending" | "verified" | "rejected";
	twoFactorEnabled: boolean;
}

export interface Wallet {
	currency: "USD" | "GBP" | "EUR" | "NGN";
	balance: number;
	isActive: boolean;
}

export interface Transaction {
	type: "send" | "receive" | "convert" | "fund";
	amount: number;
	currency: string;
	fee: number;
	status: "pending" | "processing" | "completed" | "failed" | "refunded";
	reference: string;
	description?: string;
	beneficiaryId?: {
		name: string;
		_id: string;
	};
	createdAt: string;
}

export interface Invoice {
	invoiceNumber: string;
	customerName: string;
	customerEmail: string;
	billingAddress: string;
	items: InvoiceItem[];
	subtotal: number;
	tax: number;
	total: number;
	currency: string;
	status: "draft" | "pending" | "processing" | "paid" | "due" | "overdue";
	dueDate: string;
	paidAt?: string;
	createdAt: string;
}

export interface InvoiceItem {
	description: string;
	quantity: number;
	rate: number;
	amount: number;
}

export interface Card {
	cardName: string;
	cardType: "virtual" | "physical";
	cardBrand: "visa" | "mastercard";
	currency: string;
	balance: number;
	isActive: boolean;
	fee: number;
	maskedNumber?: string;
	expiryDate: string;
}

export interface Beneficiary {
	name: string;
	email?: string;
	accountNumber?: string;
	bankName?: string;
	finpayTag?: string;
	type: "finpay" | "bank" | "international";
	isActive: boolean;
}

export interface Notification {
	title: string;
	message: string;
	type: "transaction" | "invoice" | "security" | "system";
	isRead: boolean;
	actionUrl?: string;
	createdAt: string;
}

export interface ExchangeRate {
	fromCurrency: string;
	toCurrency: string;
	buyRate: number;
	sellRate: number;
	lastUpdated: string;
}

export interface DashboardStats {
	wallets: Array<{ currency: string; balance: number }>;
	recentTransactions: Transaction[];
	invoiceStats: Array<{ _id: string; count: number; totalAmount: number }>;
	cardCount: number;
	exchangeRates: ExchangeRate[];
}

export interface RegisterPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
