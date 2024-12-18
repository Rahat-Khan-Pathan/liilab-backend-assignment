import prismaClient from "../../DB/PrismaClient";

const prisma = prismaClient;

interface IScore {
	text?: string;
	list?: number[];
}

const CreateAsync = async (data: IScore) => {
	const answer = await prisma.answer.create({
		data: data,
	});

	return answer;
};

export const AnswerRepository = {
	CreateAsync,
};
