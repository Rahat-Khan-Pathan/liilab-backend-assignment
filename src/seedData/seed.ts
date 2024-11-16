import { defaultErrorHandler } from "../Utils/error";
import { PrismaClient, QuestionType } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const seedAudios = async () => {
	const audios = [
		{
			id: 1,
			audioUrl:
				"https://sgp1.digitaloceanspaces.com/liilab/quizbit/media/en-GB_Amy_1722755742193.m4a",
			speaker: "Amy",
			language: "UK",
		},
		{
			id: 2,
			audioUrl:
				"https://sgp1.digitaloceanspaces.com/liilab/quizbit/media/en-US_John_1722755742194.m4a",
			speaker: "John",
			language: "US",
		},
		{
			id: 3,
			audioUrl:
				"https://sgp1.digitaloceanspaces.com/liilab/quizbit/media/en-GB_Emma_1722755742195.m4a",
			speaker: "Emma",
			language: "UK",
		},
	];

	await prisma.audio.deleteMany({});
	await prisma.audio.createMany({
		data: audios,
	});
	console.log("Seed data for audios inserted successfully!");
};

const seedParagraphs = async () => {
	const paragraphs = [
		{
			id: 1,
			text: "They state a claim and use evidence or data as reasons to convince us their argument is valid.",
			order: 1,
		},
		{
			id: 2,
			text: "Logical reasoning is pervasive.",
			order: 2,
		},
		{
			id: 3,
			text: "Then they organize their claims and reasons for easy audience comprehension.",
			order: 3,
		},
	];

	await prisma.paragraph.deleteMany({});
	await prisma.paragraph.createMany({
		data: paragraphs,
	});

	console.log("Seed data for paragraphs inserted successfully!");
};

const seedOptions = async () => {
	const options = [
		{
			id: 1,
			text: "Typewriters made editing easier and faster.",
		},
		{
			id: 2,
			text: "AI writing assistants improve clarity and effectiveness in communication.",
		},
		{
			id: 3,
			text: "AI-generated text creates new content, lessening human input in writing.",
		},
		{
			id: 4,
			text: "Future writing tech may suggest personal styles and understand context better.",
		},
		{
			id: 5,
			text: "The printing press made books more accessible, revolutionizing communication.",
		},
	];

	await prisma.option.deleteMany({});
	await prisma.option.createMany({
		data: options,
	});

	console.log("Seed data for options inserted successfully!");
};

const seedSstQuestions = async () => {
	const sstQuestions = [
		{
			id: 1,
			title: "Evolution of Medicare",
			answerTimeLimit: 10,
			Audios: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			},
		},
	];

	await prisma.sstQuestion.deleteMany({});
	await prisma.sstQuestion.create({
		data: sstQuestions[0],
	});

	console.log("Seed data for sst questions inserted successfully!");
};

const seedRoQuestions = async () => {
	const roQuestions = [
		{
			id: 1,
			title: `Argument Analysis`,
			Paragraphs: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			},
		},
	];

	await prisma.roQuestion.deleteMany({});
	await prisma.roQuestion.create({
		data: roQuestions[0],
	});

	console.log("Seed data for ro questions inserted successfully!");
};

const seedRmmcqQuestions = async () => {
	const rmmcqQuestions = [
		{
			id: 1,
			title: "Writing Technology",
			passage: `Writing technology has revolutionized the way we communicate and express our thoughts. From the invention of the printing press to the advent of word processors and now to AI-powered writing assistants, each advancement has brought us closer to a world where ideas can be shared more efficiently and effectively. The printing press democratized knowledge, making books accessible to the masses. The typewriter streamlined the writing process, while the word processor brought about a new level of editing ease. Today, AI-powered writing technology like grammar checkers and style editors help us refine our writing, making it more clear, concise, and powerful. Moreover, AI can now generate human-like text, aiding in tasks ranging from drafting emails to writing articles. This not only saves time but also helps overcome writer's block. However, it's important to use such technology responsibly, ensuring originality and authenticity in our writing. In the future, we can expect writing technology to become even more sophisticated, perhaps offering personalized writing style suggestions and even understanding context better. As we continue to innovate, the act of writing will become more about the art of storytelling and less about the mechanics of grammar and syntax. This is the power and promise of writing technology.`,
			Options: {
				connect: [
					{ id: 1 },
					{ id: 2 },
					{ id: 3 },
					{ id: 4 },
					{ id: 5 },
				],
			},
		},
	];

	await prisma.rmmcqQuestion.deleteMany({});
	await prisma.rmmcqQuestion.create({
		data: rmmcqQuestions[0],
	});

	console.log("Seed data for rmmcq questions inserted successfully!");
};

const seedQuestions = async () => {
	const questions = [
		{
			id: 1,
			type: QuestionType.SST,
			sstQuestionId: 1,
			roQuestionId: null,
			rmmcqQuestionId: null,
		},
		{
			id: 2,
			type: QuestionType.RO,
			sstQuestionId: null,
			roQuestionId: 1,
			rmmcqQuestionId: null,
		},
		{
			id: 3,
			type: QuestionType.RMMCQ,
			sstQuestionId: null,
			roQuestionId: null,
			rmmcqQuestionId: 1,
		},
	];

	await prisma.question.deleteMany({});
	for (const question of questions) {
		await prisma.question.create({
			data: question,
		});
	}
};
export const seedData = async (req: Request, res: Response) => {
	try {
		await seedAudios();
		await seedParagraphs();
		await seedOptions();
		await seedSstQuestions();
		await seedRoQuestions();
		await seedRmmcqQuestions();
		await seedQuestions();
		return res.status(200).json({
			success: true,
			message: "Seed data inserted successfully!",
		});
	} catch (err: any) {
		return defaultErrorHandler({
			res,
			status: 500,
			message: err,
		});
	}
};
