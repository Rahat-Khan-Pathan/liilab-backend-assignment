import { PrismaClient, Question, SstQuestion, TrackInfo } from "@prisma/client";
import { IQuestionFilterParam } from "./QuestionFilterParam";

const prisma = new PrismaClient();

export const QuestionRepository = {
	GetAllAsync: async (
		filter: IQuestionFilterParam
	): Promise<
		(Question & {
			SstQuestion: SstQuestion;
		})[]
	> => {
		const questions = await prisma.question.findMany({
			where: filter,
			include: {
				SstQuestion: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return questions;
	},

	GetDetailsAsync: async (
		filter: IQuestionFilterParam
	): Promise<
		| (Question & {
				SstQuestion: SstQuestion & {
					TrackInfos: TrackInfo[];
				};
		  })
		| null
	> => {
		const question = await prisma.question.findUnique({
			where: filter,
			include: {
				SstQuestion: {
					include: {
						TrackInfos: true,
					},
				},
			},
		});

		return question;
	},
};
