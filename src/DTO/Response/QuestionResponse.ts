import { QuestionType } from "@prisma/client";

export interface IQuestionResponse {
	id: number;
	title: string;
	type: QuestionType;
	createdAt: Date;
}

export interface IQuestionDetailsResponse extends IQuestionResponse {
	audios?:
		| {
				id: number;
				audioUrl: string;
				speaker: string;
				language: string;
				createdAt: Date;
		  }[]
		| null;
	paragraphs?:
		| {
				id: number;
				text: string;
				order: number;
				createdAt: Date;
		  }[]
		| null;
	passage?: string | null;
	options?:
		| {
				id: number;
				text: string;
				createdAt: Date;
		  }[]
		| null;
}
