import { QuestionRepository } from "../Repositories/Question/QuestionRepository";
import { IQuestionDetailsResponse } from "../DTO/Response/QuestionResponse";
import { IQuestionResponse } from "../DTO/Response/QuestionResponse";
import { defaultErrorHandler } from "../Utils/error";
import {
	Question,
	QuestionType,
	SstQuestion,
	Audio,
	RoQuestion,
	RmmcqQuestion,
	Option,
	Paragraph,
} from "@prisma/client";
import { Request, Response } from "express";
import {
	IQuestionDetailsServiceResponseModel,
	IQuestionServiceResponseModel,
} from "@/DTO/Response/ServiceResponseModel";

const GetAllAsync = async (req: Request, res: Response) => {
	try {
		const { type } = req.query as {
			type: string;
		};

		const searchParams: {
			type?: QuestionType;
		} = {};

		// type should be in enum i.e. SST, RO or RMMCQ in capital letter
		if (
			type &&
			Object.values(QuestionType).includes(type as QuestionType)
		) {
			searchParams.type = type as QuestionType;
		}

		let { page, limit } = req.query as Record<string, string>;

		if (!page) page = "1";
		if (!limit) limit = "10";

		const take = parseInt(limit, 10);
		const skip = (parseInt(page, 10) - 1) * take;

		const questions = await QuestionRepository.GetAllAsync(searchParams, {
			skip: skip,
			take: take,
		});

		const response: IQuestionServiceResponseModel = {
			success: true,
			data: {
				questions: questions.map((qs) => Map(qs)),
			},
			message: "Questions retrieved successfully.",
		};

		res.status(200).json(response);
	} catch (err: any) {
		return defaultErrorHandler({
			res,
			status: 500,
			message: err,
		});
	}
};

const GetDetailsAsync = async (req: Request, res: Response) => {
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

		const question = await QuestionRepository.GetDetailsAsync(searchParams);

		if (question == null) {
			return defaultErrorHandler({
				res,
				status: 404,
				message: "No question found!",
			});
		}

		const response: IQuestionDetailsServiceResponseModel = {
			success: true,
			data: {
				question: MapDetails(question),
			},
			message: "Question details retrieved successfully.",
		};

		res.status(200).json(response);
	} catch (err: any) {
		return defaultErrorHandler({
			res,
			status: 500,
			message: err,
		});
	}
};

// return id, title and type as response
const Map = (
	question: Question & {
		SstQuestion: SstQuestion | null;
		RoQuestion: RoQuestion | null;
		RmmcqQuestion: RmmcqQuestion | null;
	}
): IQuestionResponse => {
	const questionResponse: IQuestionResponse = {
		id: question.id,
		title:
			question.type == QuestionType.SST
				? question.SstQuestion!.title
				: question.type == QuestionType.RO
				? question.RoQuestion!.title
				: question.RmmcqQuestion!.title,
		type: question.type,
		createdAt: question.createdAt,
	};

	return questionResponse;
};

// return detailed response by type
const MapDetails = (
	question: Question & {
		SstQuestion:
			| (SstQuestion & {
					Audios: Audio[];
			  })
			| null;
		RoQuestion:
			| (RoQuestion & {
					Paragraphs: Paragraph[];
			  })
			| null;
		RmmcqQuestion:
			| (RmmcqQuestion & {
					Options: Option[];
			  })
			| null;
	}
): IQuestionDetailsResponse => {
	let questionResponse: IQuestionDetailsResponse;

	if (question.type == QuestionType.SST) {
		questionResponse = {
			id: question.id,
			title: question.SstQuestion!.title,
			type: question.type,
			audios: question.SstQuestion!.Audios.map((ti) => ({
				id: ti.id,
				audioUrl: ti.audioUrl,
				speaker: ti.speaker,
				language: ti.language,
				createdAt: ti.createdAt,
			})),
			createdAt: question.createdAt,
		};
	} else if (question.type == QuestionType.RO) {
		questionResponse = {
			id: question.id,
			title: question.RoQuestion!.title,
			type: question.type,
			paragraphs: question.RoQuestion!.Paragraphs.map((pr) => ({
				id: pr.id,
				text: pr.text,
				order: pr.order,
				createdAt: pr.createdAt,
			})),
			createdAt: question.createdAt,
		};
	} else {
		questionResponse = {
			id: question.id,
			title: question.RmmcqQuestion!.title,
			type: question.type,
			passage: question.RmmcqQuestion!.passage,
			options: question.RmmcqQuestion!.Options.map((op) => ({
				id: op.id,
				text: op.text,
				createdAt: op.createdAt,
			})),
			createdAt: question.createdAt,
		};
	}

	return questionResponse;
};

export const QuestionService = {
	GetAllAsync,
	GetDetailsAsync,
};
