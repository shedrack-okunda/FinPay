/* eslint-disable react-refresh/only-export-components */

import {
	useState,
	useEffect,
	createContext,
	useContext,
	type ReactNode,
} from "react";
import type { RegisterPayload, User } from "../types";
import { authService } from "../services/auth";

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	register: (userData: RegisterPayload) => Promise<void>;
	logout: () => void;
	loading: boolean;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			// Normally verify token and fetch user info
			setLoading(false);
		} else {
			setLoading(false);
		}
	}, []);

	const login = async (email: string, password: string) => {
		const response = await authService.login({ email, password });
		setUser(response.user);
		localStorage.setItem("accessToken", response.accessToken);
		localStorage.setItem("refreshToken", response.refreshToken);
	};

	const register = async (userData: RegisterPayload) => {
		const response = await authService.register(userData);
		setUser(response.user);
		localStorage.setItem("accessToken", response.accessToken);
		localStorage.setItem("refreshToken", response.refreshToken);
	};

	const logout = () => {
		authService.logout();
		setUser(null);
	};

	const value: AuthContextType = {
		user,
		login,
		register,
		logout,
		loading,
		isAuthenticated: !!user,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
