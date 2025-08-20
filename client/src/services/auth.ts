import type { User } from "../types";
import api from "./api";

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
	message: string;
}

export const authService = {
	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		const response = await api.post("/auth/login", credentials);
		return response.data;
	},

	async register(userData: RegisterData): Promise<AuthResponse> {
		const response = await api.post("/auth/register", userData);
		return response.data;
	},

	async refreshToken(
		refreshToken: string
	): Promise<{ accessToken: string; refreshToken: string }> {
		const response = await api.post("/auth/refresh-token", {
			refreshToken,
		});
		return response.data;
	},

	async logout(): Promise<void> {
		await api.post("/auth/logout");
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
	},
};
