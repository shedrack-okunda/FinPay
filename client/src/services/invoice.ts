import type { Invoice, InvoiceItem } from "../types";
import api from "./api";

export interface CreateInvoiceData {
	customerName: string;
	customerEmail: string;
	billingAddress: string;
	items: InvoiceItem[];
	currency: string;
	dueDate: string;
	tax?: number;
}

export const invoiceService = {
	async getInvoices(
		filters: { page?: number; limit?: number; status?: string } = {}
	) {
		const response = await api.get("/invoices", { params: filters });
		return response.data;
	},

	async createInvoice(data: CreateInvoiceData) {
		const response = await api.post("/invoices", data);
		return response.data;
	},

	async updateInvoice(id: string, data: Partial<Invoice>) {
		const response = await api.put(`/invoices/${id}`, data);
		return response.data;
	},

	async deleteInvoice(id: string) {
		const response = await api.delete(`/invoices/${id}`);
		return response.data;
	},
};
