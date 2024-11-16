import {
	IQuestionDetailsResponse,
	IQuestionResponse,
} from "./QuestionResponse";
import { ISubmissionsResponse } from "./SubmissionResponse";

export interface IResponseModel {
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

export interface ISubmissionServiceResponseModel extends IResponseModel {
	data: {
		submissions: ISubmissionsResponse[];
	};
}
