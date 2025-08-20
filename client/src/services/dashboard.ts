import type { DashboardStats } from "../types";
import api from "./api";

export const dashboardService = {
	async getDashboardStats(): Promise<DashboardStats> {
		const response = await api.get("/dashboard/stats");
		return response.data;
	},
};
