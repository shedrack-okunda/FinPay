import type { Wallet } from "../types";
import api from "./api";

export const walletService = {
	async getWallets(): Promise<{ wallets: Wallet[] }> {
		const response = await api.get("/wallets");
		return response.data;
	},

	async getWalletBalance(
		currency: string
	): Promise<{ balance: number; currency: string }> {
		const response = await api.get(`/wallets/${currency}`);
		return response.data;
	},

	async fundWallet(data: {
		currency: string;
		amount: number;
		paymentMethod: string;
	}) {
		const response = await api.post("/wallets/fund", data);
		return response.data;
	},

	async convertFunds(data: {
		fromCurrency: string;
		toCurrency: string;
		amount: number;
	}) {
		const response = await api.post("/wallets/convert", data);
		return response.data;
	},
};
