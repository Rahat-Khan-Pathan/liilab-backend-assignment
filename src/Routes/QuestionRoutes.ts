import { QuestionService } from "../Services/QuestionService";
import express from "express";

const QuestionRoutes = express.Router();

QuestionRoutes.get("/", QuestionService.GetAllAsync);
QuestionRoutes.get("/:id", QuestionService.GetDetailsAsync);

export default QuestionRoutes;
