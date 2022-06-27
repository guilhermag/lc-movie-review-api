/*
  Warnings:

  - You are about to drop the column `cittedCommentsId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "cittedCommentsId",
ADD COLUMN     "quotedCommentsId" INTEGER[];
