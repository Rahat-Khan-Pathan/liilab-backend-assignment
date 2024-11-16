import { QuestionType } from "@prisma/client";

export interface IQuestionRequest {
	type: QuestionType;
	answer: string | number[];
}
