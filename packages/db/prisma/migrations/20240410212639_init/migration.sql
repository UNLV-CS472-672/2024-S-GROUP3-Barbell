/*
  Warnings:

  - You are about to drop the column `readByUserId` on the `Chat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Award` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Log` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Set` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendId` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Message_chatId_key";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "readByUserId",
ADD COLUMN     "readByUserIds" INTEGER[],
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "friendId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "notificationsBanners" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "streak" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "SpotifyData" (
    "id" SERIAL NOT NULL,
    "albumImageURL" TEXT,
    "albumName" TEXT,
    "artist" TEXT,
    "isPlaying" BOOLEAN NOT NULL DEFAULT false,
    "songURL" TEXT,
    "title" TEXT,
    "timePlayed" INTEGER,
    "timeTotal" INTEGER,
    "artistURL" TEXT,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "SpotifyData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpotifyData_id_key" ON "SpotifyData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SpotifyData_userID_key" ON "SpotifyData"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Award_id_key" ON "Award"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_id_key" ON "Chat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_id_key" ON "Exercise"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_id_key" ON "Friend"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Log_id_key" ON "Log"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_id_key" ON "Notification"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Set_id_key" ON "Set"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_id_key" ON "Workout"("id");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotifyData" ADD CONSTRAINT "SpotifyData_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
