import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IScore {
	score?: number;
	contentScore?: number;
	formScore?: number;
	grammarScore?: number;
	vocabularyScore?: number;
	spellingScore?: number;
	maximumScore?: number;
}

const CreateAsync = async (data: IScore) => {
	const score = await prisma.score.create({
		data: data,
	});

	return score;
};

export const ScoreRepository = {
	CreateAsync,
};
