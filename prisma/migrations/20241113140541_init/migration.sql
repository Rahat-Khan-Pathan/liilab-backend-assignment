-- CreateEnum
CREATE TYPE "PteQuestionType" AS ENUM ('SST', 'RO', 'RMMCQ');

-- CreateTable
CREATE TABLE "TrackInfo" (
    "id" SERIAL NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "speaker" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "sstQuestionId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SstQuestion" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "answerTimeLimit" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SstQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "type" "PteQuestionType" NOT NULL,
    "sstQuestionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Question_type_sstQuestionId_idx" ON "Question"("type", "sstQuestionId");

-- AddForeignKey
ALTER TABLE "TrackInfo" ADD CONSTRAINT "TrackInfo_sstQuestionId_fkey" FOREIGN KEY ("sstQuestionId") REFERENCES "SstQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sstQuestionId_fkey" FOREIGN KEY ("sstQuestionId") REFERENCES "SstQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
