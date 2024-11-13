import { QuestionType } from "@prisma/client";

export interface IQuestionResponse {
	id: number;
	title: string;
	createdAt: Date;
}

export interface ISstQuestionDetailsResponse extends IQuestionResponse {
	audios: {
		id: number;
		audioUrl: string;
		speaker: string;
		language: string;
		createdAt: Date;
	}[];
}

interface IResponseModel {
	success: boolean;
	message: string;
}

export interface IQuestionServiceResponse extends IResponseModel {
	data: {
		questions: IQuestionResponse[];
	};
}

export interface ISstQuestionDetailsServiceResponse extends IResponseModel {
	data: {
		question: ISstQuestionDetailsResponse;
	};
}
