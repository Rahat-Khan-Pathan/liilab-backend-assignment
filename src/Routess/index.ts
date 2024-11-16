import { Router } from "express";
import QuestionRoutes from "./QuestionRoutes";
import SubmissionRoutes from "./SubmissionRoutes";

const apiRoutes = Router();

apiRoutes.use("/question", QuestionRoutes);
apiRoutes.use("/submission", SubmissionRoutes);

export default apiRoutes;
