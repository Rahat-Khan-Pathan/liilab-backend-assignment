/*
  Warnings:

  - You are about to drop the `TrackInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SstQuestionToTrackInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SstQuestionToTrackInfo" DROP CONSTRAINT "_SstQuestionToTrackInfo_A_fkey";

-- DropForeignKey
ALTER TABLE "_SstQuestionToTrackInfo" DROP CONSTRAINT "_SstQuestionToTrackInfo_B_fkey";

-- DropTable
DROP TABLE "TrackInfo";

-- DropTable
DROP TABLE "_SstQuestionToTrackInfo";

-- CreateTable
CREATE TABLE "Audio" (
    "id" SERIAL NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "speaker" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "sstQuestionId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paragraph" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roQuestionId" INTEGER,

    CONSTRAINT "Paragraph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoQuestion" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RmmcqQuestion" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "passage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RmmcqQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_sstQuestionId_fkey" FOREIGN KEY ("sstQuestionId") REFERENCES "SstQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paragraph" ADD CONSTRAINT "Paragraph_roQuestionId_fkey" FOREIGN KEY ("roQuestionId") REFERENCES "RoQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
