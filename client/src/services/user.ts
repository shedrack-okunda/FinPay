import type { User } from "../types";
import api from "./api";

export const userService = {
	async getProfile(): Promise<User> {
		const res = await api.get("/users/me/profile");
		return res.data;
	},

	async updateProfile(data: Partial<User>): Promise<User> {
		const res = await api.put("/users/me/profile", data);
		return res.data.user;
	},
};
