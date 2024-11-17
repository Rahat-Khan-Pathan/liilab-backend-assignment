/*
  Warnings:

  - Changed the type of `type` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('SST', 'RO', 'RMMCQ');

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "type",
ADD COLUMN     "type" "QuestionType" NOT NULL;

-- DropEnum
DROP TYPE "PteQuestionType";

-- CreateIndex
CREATE INDEX "Question_type_sstQuestionId_idx" ON "Question"("type", "sstQuestionId");
