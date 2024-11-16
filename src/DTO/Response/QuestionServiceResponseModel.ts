import {
	IQuestionDetailsResponse,
	IQuestionResponse,
} from "./QuestionResponse";

interface IResponseModel {
	success: boolean;
	message: string;
}

export interface IQuestionServiceResponseModel extends IResponseModel {
	data: {
		questions: IQuestionResponse[];
	};
}

export interface IQuestionDetailsServiceResponseModel extends IResponseModel {
	data: {
		question: IQuestionDetailsResponse;
	};
}
