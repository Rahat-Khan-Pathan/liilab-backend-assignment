-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "score" INTEGER,
    "contentScore" INTEGER,
    "formScore" INTEGER,
    "grammerScore" INTEGER,
    "vocabularyScore" INTEGER,
    "spellingScore" INTEGER,
    "maximumScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "type" "QuestionType" NOT NULL,
    "sstQuestionId" INTEGER,
    "roQuestionId" INTEGER,
    "rmmcqQuestionId" INTEGER,
    "scoreId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_sstQuestionId_fkey" FOREIGN KEY ("sstQuestionId") REFERENCES "SstQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_roQuestionId_fkey" FOREIGN KEY ("roQuestionId") REFERENCES "RoQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_rmmcqQuestionId_fkey" FOREIGN KEY ("rmmcqQuestionId") REFERENCES "RmmcqQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
