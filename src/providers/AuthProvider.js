"use client";

import { authClient } from "@/lib/auth-client";
import { createContext, useContext } from "react";

const AuthContext = createContext({
	user: null,
	loading: true,
	login: async () => {},
	registerUser: async () => {},
	logout: async () => {},
});

export function AuthProvider({ children }) {
	const { data: session, isPending } = authClient.useSession();
	const user = session?.user || null;

	const login = async (email, password) => {
		const { data, error } = await authClient.signIn.email({
			email,
			password,
		});
		if (error) {
			throw new Error(error.message || "Failed to sign in");
		}
		return data;
	};

	const registerUser = async (name, email, password, photoURL) => {
		const { data, error } = await authClient.signUp.email({
			email,
			password,
			name,
			image: photoURL || "",
		});
		if (error) {
			throw new Error(error.message || "Failed to sign up");
		}
		return data;
	};

	const logout = async () => {
		const { error } = await authClient.signOut();
		if (error) {
			throw new Error(error.message || "Failed to sign out");
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, loading: isPending, login, registerUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
