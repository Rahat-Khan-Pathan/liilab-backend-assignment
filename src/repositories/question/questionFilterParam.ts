import { QuestionType } from "@prisma/client";

export interface IQuestionFilterParam {
	type?: QuestionType;
	id?: number;
}
