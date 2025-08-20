import axios from "axios";

const API_BASE_URL =
	import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Response interceptor for token refresh
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");
				const response = await axios.post(
					`${API_BASE_URL}/auth/refresh-token`,
					{
						refreshToken,
					}
				);

				const { accessToken } = response.data;
				localStorage.setItem("accessToken", accessToken);

				return api(originalRequest);
			} catch (refreshError) {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default api;
