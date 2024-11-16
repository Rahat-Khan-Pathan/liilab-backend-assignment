import { PrismaClient } from "@prisma/client";
import {
	IQuestionFilterParam,
	IQuestionPagingModel,
} from "./QuestionFilterParam";

const prisma = new PrismaClient();

const GetAllAsync = async (
	filter: IQuestionFilterParam,
	paging: IQuestionPagingModel
) => {
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
		skip: paging.skip,
		take: paging.take,
	});

	return questions;
};

const GetByIdAsync = async (filter: IQuestionFilterParam) => {
	const question = await prisma.question.findUnique({
		where: filter,
	});

	return question;
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
	GetByIdAsync,
};
