import type { Transaction } from "../types";
import api from "./api";

export interface TransactionFilters {
	page?: number;
	limit?: number;
	status?: string;
	type?: string;
}

export const transactionService = {
	async getTransactions(filters: TransactionFilters = {}) {
		const response = await api.get("/transactions", { params: filters });
		return response.data;
	},

	async sendMoney(data: {
		beneficiaryId: string;
		amount: number;
		currency: string;
		description?: string;
	}) {
		const response = await api.post("/transactions/send", data);
		return response.data;
	},

	async getTransactionById(
		id: string
	): Promise<{ transaction: Transaction }> {
		const response = await api.get(`/transactions/${id}`);
		return response.data;
	},
};
