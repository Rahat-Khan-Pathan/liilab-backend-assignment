/*
  Warnings:

  - You are about to drop the column `rmmcqQuestionId` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `roQuestionId` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `sstQuestionId` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_rmmcqQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_roQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_sstQuestionId_fkey";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "rmmcqQuestionId",
DROP COLUMN "roQuestionId",
DROP COLUMN "sstQuestionId",
ADD COLUMN     "questionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
