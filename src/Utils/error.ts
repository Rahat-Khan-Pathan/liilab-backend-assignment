import { Response } from "express";

export const defaultErrorHandler = ({
	res,
	status,
	message,
}: {
	res: Response;
	status?: number;
	message?: string;
}) => {
	return res.status(status || 500).json({
		success: false,
		message: message || "Something went wrong",
	});
};
