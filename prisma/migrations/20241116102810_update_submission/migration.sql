/*
  Warnings:

  - You are about to drop the column `grammerScore` on the `Score` table. All the data in the column will be lost.
  - Added the required column `answerId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "grammerScore",
ADD COLUMN     "grammarScore" INTEGER;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "answerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "text" TEXT,
    "list" INTEGER[],

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
