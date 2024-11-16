import { QuestionService } from "../Services/QuestionService";
import express from "express";

const QuestionRoutes = express.Router();

QuestionRoutes.get("/", QuestionService.getAllAsync);
QuestionRoutes.get("/:id", QuestionService.getDetailsAsync);

export default QuestionRoutes;
