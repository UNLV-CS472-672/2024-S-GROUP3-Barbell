/*
  Warnings:

  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PosterSource" AS ENUM ('RAW', 'GITHUB');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "title";

-- CreateTable
CREATE TABLE "Post2" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "source" "PosterSource" NOT NULL DEFAULT 'RAW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post2_createdAt_key" ON "Post2"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Post2_updatedAt_key" ON "Post2"("updatedAt");
