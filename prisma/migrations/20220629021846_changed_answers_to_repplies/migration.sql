/*
  Warnings:

  - You are about to drop the column `answers` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "answers",
ADD COLUMN     "replies" TEXT[];
