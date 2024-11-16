import { PrismaClient, QuestionType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const trackInfos = [
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

	await prisma.trackInfo.deleteMany({});
	await prisma.trackInfo.createMany({
		data: trackInfos,
		skipDuplicates: true,
	});

	const sstQuestions = [
		{
			id: 1,
			title: "Evolution of Medicare",
			answerTimeLimit: 10,
			TrackInfos: {
				connect: [{ id: 1 }, { id: 2 }],
			},
		},
		{
			id: 2,
			title: "Rhythmic History",
			answerTimeLimit: 15,
			TrackInfos: {
				connect: [{ id: 2 }],
			},
		},
		{
			id: 3,
			title: "Role of Tears",
			answerTimeLimit: 12,
			TrackInfos: {
				connect: [{ id: 3 }],
			},
		},
	];

	await prisma.sstQuestion.deleteMany({});
	for (const sstQuestion of sstQuestions) {
		await prisma.sstQuestion.create({
			data: sstQuestion,
		});
	}

	const questions = [
		{ id: 1, type: QuestionType.SST, sstQuestionId: 1 },
		{ id: 2, type: QuestionType.SST, sstQuestionId: 2 },
		{ id: 3, type: QuestionType.SST, sstQuestionId: 3 },
	];

	await prisma.question.deleteMany({});
	await prisma.question.createMany({
		data: questions,
		skipDuplicates: true,
	});

	console.log("Seed data inserted successfully!");
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
