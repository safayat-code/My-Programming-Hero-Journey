import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017");
const db = client.db(process.env.MONGODB_DB || "bazardor");

const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  socialProviders.google = { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET };
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
  socialProviders.github = { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET };

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  secret: process.env.BETTER_AUTH_SECRET || "dev-secret-change-me-dev-secret-change-me",
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true, autoSignIn: false, minPasswordLength: 6 },
  socialProviders,
});
