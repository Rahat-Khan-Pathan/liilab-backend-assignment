import { Router } from "express";
import QuestionRoutes from "./questionRoutes";

const apiRoutes = Router();

apiRoutes.use("/question", QuestionRoutes);

export default apiRoutes;
