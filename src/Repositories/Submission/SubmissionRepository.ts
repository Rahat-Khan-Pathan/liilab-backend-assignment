import { QuestionType } from "@prisma/client";
import prismaClient from "../../DB/PrismaClient";
import {
	ISubmissionPagingModel,
	ISubmissionsFilterParam,
} from "./SubmissionFilterParam";

const prisma = prismaClient;

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
