import * as dotenv from "dotenv";
dotenv.config();

export const configs = {
	PORT: process.env.PORT!,
	JWT_SECRET: process.env.JWT_SECRET!,
	MAILGUN_API_SECRET: process.env.MAILGUN_API_SECRET!,
	MAILGUN_URL: process.env.MAILGUN_URL!,
	MAILGUN_USERNAME: process.env.MAILGUN_USERNAME!,
	REDIS_HOST:
		process.env.MODE! === "development"
			? process.env.REDIS_HOST_DEV!
			: process.env.REDIS_HOST_PROD!,
	REDIS_PASS: process.env.REDIS_PASS!,
	CLIENT_URL:
		process.env.MODE! === "development"
			? process.env.CLIENT_URL_DEV!
			: process.env.CLIENT_URL_PROD!,
	DATABASE_URL:
		process.env.MODE! === "development"
			? process.env.DATABASE_URL_DEV!
			: process.env.DATABASE_URL_PROD!,
	JUDGE0_API_KEY: process.env.JUDGE0_API_KEY!,
	JUDGE0_API: process.env.JUDGE0_API!,
};
