import { SubmissionService } from "../Servicess/SubmissionService";
import express from "express";

const SubmissionRoutes = express.Router();

SubmissionRoutes.get("/history", SubmissionService.GetAllAsync);
SubmissionRoutes.post("/:questionId", SubmissionService.CreateAsync);

export default SubmissionRoutes;
