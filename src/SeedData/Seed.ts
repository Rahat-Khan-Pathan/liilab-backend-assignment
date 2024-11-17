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
};

const seedRmmcqQuestions = async () => {
	const rmmcqQuestions = [
		{
			id: 1,
			title: "Writing Technology",
			passage: `Writing technology has revolutionized the way we communicate and express our thoughts. From the invention of the printing press to the advent of word processors and now to AI-powered writing assistants, each advancement has brought us closer to a world where ideas can be shared more efficiently and effectively.`,
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

export const initialSeedData = async () => {
	await prisma.submission.deleteMany({});

	await seedAudios();
	await seedParagraphs();
	await seedOptions();
	await seedSstQuestions();
	await seedRoQuestions();
	await seedRmmcqQuestions();
	await seedQuestions();

	console.log("Seed data inserted successfully!");
};

export const seedData = async (req: Request, res: Response) => {
	try {
		await prisma.submission.deleteMany({});

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
