import { QuestionType } from "@prisma/client";

export interface ISubmissionsFilterParam {
	type?: QuestionType;
	id?: number;
}

export interface ISubmissionPagingModel {
	skip?: number;
	take?: number;
}
