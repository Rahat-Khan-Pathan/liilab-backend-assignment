import { QuestionType } from "@prisma/client";

export interface ISubmissionRequest {
	type: QuestionType;
	answer: string | number[];
}
