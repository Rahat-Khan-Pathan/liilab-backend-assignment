import { PrismaClient, QuestionType } from "@prisma/client";
import {
	ISubmissionPagingModel,
	ISubmissionsFilterParam,
} from "./SubmissionFilterParam";

const prisma = new PrismaClient();

const GetAllAsync = async (
	filter: ISubmissionsFilterParam,
	paging: ISubmissionPagingModel
) => {
	const submissions = await prisma.submission.findMany({
		where: filter,
		include: {
			Question: {
				include: {
					SstQuestion: true,
					RoQuestion: true,
					RmmcqQuestion: true,
				},
			},
			Score: true,
			Answer: true,
		},
		orderBy: {
			createdAt: "asc",
		},
		skip: paging.skip,
		take: paging.take,
	});

	return submissions;
};

const CreateAsync = async (
	type: QuestionType,
	questionId: number,
	scoreId: number,
	answerId: number
) => {
	console.log(type, questionId);
	const submission = await prisma.submission.create({
		data: {
			type: type,
			questionId: questionId,
			scoreId: scoreId,
			answerId: answerId,
		},
	});

	return submission;
};

export const SubmissionRepository = {
	GetAllAsync,
	CreateAsync,
};
