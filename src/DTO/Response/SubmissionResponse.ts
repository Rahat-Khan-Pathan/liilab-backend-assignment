import { QuestionType } from "@prisma/client";

export interface ISubmissionsResponse {
	id: number;
	title: string;
	questionId?: number;
	Score: {
		score?: number | null;
		maximumScore?: number | null;
		content?: {
			score?: number | null;
			maximumScore?: number | null;
		};
		form?: {
			score?: number | null;
			maximumScore?: number | null;
		};
		grammar?: {
			score?: number | null;
			maximumScore?: number | null;
		};
		vocabulary?: {
			score?: number | null;
			maximumScore?: number | null;
		};
		spelling?: {
			score?: number | null;
			maximumScore?: number | null;
		};
	};
	type: QuestionType;
	createdAt: Date;
}
