import * as dotenv from "dotenv";
dotenv.config();

export const configs = {
	PORT: process.env.PORT!,
	DATABASE_URL: process.env.DATABASE_URL!,
};
