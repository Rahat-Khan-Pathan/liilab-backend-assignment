import {
	PrismaClient,
	Question,
	SstQuestion,
	Audio,
	RoQuestion,
	RmmcqQuestion,
} from "@prisma/client";
import { IQuestionFilterParam } from "./QuestionFilterParam";

const prisma = new PrismaClient();

const GetAllAsync = async (filter: IQuestionFilterParam) => {
	const questions = await prisma.question.findMany({
		where: filter,
		include: {
			SstQuestion: true,
			RoQuestion: true,
			RmmcqQuestion: true,
		},
		orderBy: {
			createdAt: "asc",
		},
	});

	return questions;
};

const GetDetailsAsync = async (filter: IQuestionFilterParam) => {
	const question = await prisma.question.findUnique({
		where: filter,
		include: {
			SstQuestion: {
				include: {
					Audios: true,
				},
			},
			RoQuestion: {
				include: {
					Paragraphs: true,
				},
			},
			RmmcqQuestion: {
				include: {
					Options: true,
				},
			},
		},
	});

	return question;
};

export const QuestionRepository = {
	GetAllAsync,
	GetDetailsAsync,
};
