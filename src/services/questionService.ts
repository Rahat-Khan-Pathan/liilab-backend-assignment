import { QuestionRepository } from "../Repositories/Question/QuestionRepository";
import {
	IQuestionServiceResponse,
	ISstQuestionDetailsResponse,
	ISstQuestionDetailsServiceResponse,
} from "../DTO/Response/QuestionResponse";
import { IQuestionResponse } from "../DTO/Response/QuestionResponse";
import { defaultErrorHandler } from "../Utils/error";
import { Question, QuestionType, SstQuestion, TrackInfo } from "@prisma/client";
import { Request, Response } from "express";

export const QuestionService = {
	getAllAsync: async (req: Request, res: Response) => {
		try {
			const { type } = req.query as {
				type: string;
			};

			const searchParams: {
				type?: QuestionType;
			} = {};

			if (
				type &&
				Object.values(QuestionType).includes(type as QuestionType)
			) {
				searchParams.type = type as QuestionType;
			}

			const questions = await QuestionRepository.GetAllAsync(
				searchParams
			);

			const response: IQuestionServiceResponse = {
				success: true,
				data: {
					questions: questions.map((qs) => Map(qs)),
				},
				message: "Tags retrieved successfully.",
			};

			res.status(200).json(response);
		} catch (err: any) {
			return defaultErrorHandler({
				res,
				status: 500,
				message: err,
			});
		}
	},
	getDetailsAsync: async (req: Request, res: Response) => {
		try {
			const { id } = req.params as {
				id: string;
			};

			const searchParams: {
				id?: number;
			} = {};

			if (id) {
				searchParams.id = parseInt(id);
			}

			const question = await QuestionRepository.GetDetailsAsync(
				searchParams
			);

			if (question == null) {
				return defaultErrorHandler({
					res,
					status: 404,
					message: "No question found!",
				});
			}

			const response: ISstQuestionDetailsServiceResponse = {
				success: true,
				data: {
					question: MapDetails(question),
				},
				message: "Tags retrieved successfully.",
			};

			res.status(200).json(response);
		} catch (err: any) {
			return defaultErrorHandler({
				res,
				status: 500,
				message: err,
			});
		}
	},
};

const Map = (
	question: Question & {
		SstQuestion: SstQuestion;
	}
): IQuestionResponse => {
	const questionResponse: IQuestionResponse = {
		id: question.id,
		title: question.SstQuestion.title,
		createdAt: question.createdAt,
	};

	return questionResponse;
};

const MapDetails = (
	question: Question & {
		SstQuestion: SstQuestion & {
			TrackInfos: TrackInfo[];
		};
	}
): ISstQuestionDetailsResponse => {
	const sstQuestionResponse: ISstQuestionDetailsResponse = {
		id: question.id,
		title: question.SstQuestion.title,
		createdAt: question.createdAt,
		audios: question.SstQuestion.TrackInfos.map((ti) => ({
			id: ti.id,
			audioUrl: ti.audioUrl,
			speaker: ti.speaker,
			language: ti.language,
			createdAt: ti.createdAt,
		})),
	};

	return sstQuestionResponse;
};
