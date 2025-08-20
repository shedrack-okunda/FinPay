import type { Card } from "../types";
import api from "./api";

export interface CreateCardData {
	cardName: string;
	cardType: "virtual" | "physical";
	cardBrand: "visa" | "mastercard";
	currency: string;
}

export const cardService = {
	async getCards(): Promise<{ cards: Card[] }> {
		const response = await api.get("/cards");
		return response.data;
	},

	async createCard(data: CreateCardData) {
		const response = await api.post("/cards", data);
		return response.data;
	},

	async toggleCardStatus(id: string, isActive: boolean) {
		const response = await api.put(`/cards/${id}`, { isActive });
		return response.data;
	},
};
