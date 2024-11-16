import {
	IResponseModel,
	ISubmissionServiceResponseModel,
} from "../DTO/Response/ServiceResponseModel";
import { ISubmissionsResponse } from "../DTO/Response/SubmissionResponse";
import { AnswerRepository } from "../Repositories/Answer/AnswerRepository";
import { QuestionRepository } from "../Repositories/Question/QuestionRepository";
import { ScoreRepository } from "../Repositories/Score/ScoreRepository";
import { SubmissionRepository } from "../Repositories/Submissions/SubmissionRepository";
import { defaultErrorHandler } from "../Utils/error";
import {
	Answer,
	prisma,
	Question,
	QuestionType,
	RmmcqQuestion,
	RoQuestion,
	Score,
	SstQuestion,
	Submission,
} from "@prisma/client";
import { Request, Response } from "express";
import Joi from "joi";

const getRandomScore = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const CreateAsync = async (req: Request, res: Response) => {
	try {
		const { questionId } = req.params;

		const question = await QuestionRepository.GetByIdAsync({
			id: parseInt(questionId),
		});

		if (question == null) {
			return defaultErrorHandler({
				res,
				status: 404,
				message: "No question found!",
			});
		}

		const sstSchema = Joi.object({
			text: Joi.string().required().messages({
				"string.base": "Text should be a type of text.",
				"string.empty": "Text cannot be an empty field.",
				"any.required": "Text is a required field.",
			}),
		});

		const otherQuestionSchema = Joi.object({
			list: Joi.array()
				.items(Joi.number().required())
				.required()
				.messages({
					"array.base": "List should be an array of numbers.",
					"array.includesRequiredUnknowns":
						"List must contain only numbers.",
					"any.required": "List is a required field.",
				}),
		});

		if (question.type == QuestionType.SST) {
			const { error, value } = sstSchema.validate(req.body);

			if (error) {
				return defaultErrorHandler({
					res,
					status: 400,
					message: error.details[0].message,
				});
			}

			const { text } = value;

			const score = await ScoreRepository.CreateAsync({
				contentScore: getRandomScore(0, 2),
				formScore: getRandomScore(0, 2),
				grammarScore: getRandomScore(0, 2),
				vocabularyScore: getRandomScore(0, 2),
				spellingScore: getRandomScore(0, 2),
				maximumScore: 2,
			});

			const answer = await AnswerRepository.CreateAsync({ text });

			await SubmissionRepository.CreateAsync(
				question.type,
				parseInt(questionId),
				score.id,
				answer.id
			);
		} else {
			const { error, value } = otherQuestionSchema.validate(req.body);

			if (error) {
				return defaultErrorHandler({
					res,
					status: 400,
					message: error.details[0].message,
				});
			}

			const { list } = value;

			const score = await ScoreRepository.CreateAsync({
				score: getRandomScore(0, 10),
				maximumScore: 10,
			});

			const answer = await AnswerRepository.CreateAsync({ list });

			await SubmissionRepository.CreateAsync(
				question.type,
				parseInt(questionId),
				score.id,
				answer.id
			);
		}

		const response: IResponseModel = {
			success: true,
			message: "Answer submitted successfully.",
		};

		res.status(200).json(response);
	} catch (err: any) {
		return defaultErrorHandler({
			res,
			message: err,
		});
	}
};

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

		const submissions = await SubmissionRepository.GetAllAsync(
			searchParams,
			{ skip: skip, take: take }
		);

		const response: ISubmissionServiceResponseModel = {
			success: true,
			data: {
				submissions: submissions.map((sb) => Map(sb)),
			},
			message: "Submission history retrieved successfully.",
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

const Map = (
	submission: Submission & {
		Score: Score;
		Answer: Answer;
		Question: Question & {
			SstQuestion: SstQuestion | null;
			RoQuestion: RoQuestion | null;
			RmmcqQuestion: RmmcqQuestion | null;
		};
	}
): ISubmissionsResponse => {
	const type = submission.type;

	let submissionResponse: ISubmissionsResponse;

	if (type == QuestionType.SST) {
		submissionResponse = {
			id: submission.id,
			type: submission.type,
			title:
				submission.type == QuestionType.SST
					? submission.Question.SstQuestion!.title
					: submission.type == QuestionType.RO
					? submission.Question.RoQuestion!.title
					: submission.Question.RmmcqQuestion!.title,
			questionId: submission.questionId,
			Score: {
				content: {
					score: submission.Score.contentScore,
					maximumScore: submission.Score.maximumScore,
				},
				form: {
					score: submission.Score.formScore,
					maximumScore: submission.Score.maximumScore,
				},
				grammar: {
					score: submission.Score.grammarScore,
					maximumScore: submission.Score.maximumScore,
				},
				vocabulary: {
					score: submission.Score.vocabularyScore,
					maximumScore: submission.Score.maximumScore,
				},
				spelling: {
					score: submission.Score.spellingScore,
					maximumScore: submission.Score.maximumScore,
				},
			},
			createdAt: submission.createdAt,
		};
	} else {
		submissionResponse = {
			id: submission.id,
			type: submission.type,
			title:
				submission.type == QuestionType.SST
					? submission.Question.SstQuestion!.title
					: submission.type == QuestionType.RO
					? submission.Question.RoQuestion!.title
					: submission.Question.RmmcqQuestion!.title,
			questionId: submission.questionId,
			Score: {
				score: submission.Score.score,
				maximumScore: submission.Score.maximumScore,
			},
			createdAt: submission.createdAt,
		};
	}

	return submissionResponse;
};

export const SubmissionService = {
	GetAllAsync,
	CreateAsync,
};
