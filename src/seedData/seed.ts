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
	];

	await prisma.trackInfo.deleteMany({});

	await prisma.trackInfo.createMany({
		data: trackInfos,
		skipDuplicates: true,
	});

	const sstQuestions = [
		{ id: 1, title: "Demo 1", answerTimeLimit: 10, TrackInfos: trackInfos },
	];

	await prisma.sstQuestion.deleteMany({});

	await prisma.sstQuestion.createMany({
		data: sstQuestions,
		skipDuplicates: true,
	});

	const questions = [{ id: 1, type: QuestionType.SST, sstQuestionId: 1 }];

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
