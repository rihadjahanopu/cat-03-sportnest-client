import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(
	process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/booklib"
);
const db = client.db();

export const auth = betterAuth({
	database: mongodbAdapter(db, {
		client,
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
		},
	},
	plugins: [
		jwt({
			jwt: {
				// Inject email and name into every JWT payload
				// so Express backend can identify users without a DB lookup
				definePayload: async ({ user }) => ({
					email: user.email,
					name: user.name || "",
					image: user.image || "",
				}),
			},
		})
	],
});
