/*
  Warnings:

  - You are about to drop the column `sstQuestionId` on the `TrackInfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrackInfo" DROP CONSTRAINT "TrackInfo_sstQuestionId_fkey";

-- AlterTable
ALTER TABLE "TrackInfo" DROP COLUMN "sstQuestionId";

-- CreateTable
CREATE TABLE "_SstQuestionToTrackInfo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SstQuestionToTrackInfo_AB_unique" ON "_SstQuestionToTrackInfo"("A", "B");

-- CreateIndex
CREATE INDEX "_SstQuestionToTrackInfo_B_index" ON "_SstQuestionToTrackInfo"("B");

-- AddForeignKey
ALTER TABLE "_SstQuestionToTrackInfo" ADD CONSTRAINT "_SstQuestionToTrackInfo_A_fkey" FOREIGN KEY ("A") REFERENCES "SstQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SstQuestionToTrackInfo" ADD CONSTRAINT "_SstQuestionToTrackInfo_B_fkey" FOREIGN KEY ("B") REFERENCES "TrackInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
