-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sstQuestionId_fkey";

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "rmmcqQuestionId" INTEGER;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "rmmcqQuestionId" INTEGER,
ADD COLUMN     "roQuestionId" INTEGER,
ALTER COLUMN "sstQuestionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_rmmcqQuestionId_fkey" FOREIGN KEY ("rmmcqQuestionId") REFERENCES "RmmcqQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sstQuestionId_fkey" FOREIGN KEY ("sstQuestionId") REFERENCES "SstQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_roQuestionId_fkey" FOREIGN KEY ("roQuestionId") REFERENCES "RoQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_rmmcqQuestionId_fkey" FOREIGN KEY ("rmmcqQuestionId") REFERENCES "RmmcqQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
