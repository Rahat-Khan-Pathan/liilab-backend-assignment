import * as dotenv from "dotenv";
import { configs } from "./configs";
import app from "./app";
import prismaClient from "./DB/PrismaClient";
import { initialSeedData } from "./SeedData/Seed";

dotenv.config();

const port = configs.PORT || 7869;

const prisma = prismaClient;

app.listen(port, async () => {
	console.log(`Server is running at http://localhost:${port}/`);

	const questions = await prisma.question.findMany({});
	if (questions.length == 0) {
		await initialSeedData();
	}
});
