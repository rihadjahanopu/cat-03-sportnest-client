import axios from "axios";
import { authClient } from "./auth-client";

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
	withCredentials: true,
});

api.interceptors.request.use(
	async (config) => {
		try {
			const { data } = await authClient.token();
			if (data && data.token) {
				config.headers.Authorization = `Bearer ${data.token}`;
			}
		} catch (error) {
			console.error(
				"Error fetching Better Auth token in Axios interceptor:",
				error
			);
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
