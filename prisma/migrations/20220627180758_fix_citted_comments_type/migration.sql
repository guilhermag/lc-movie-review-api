/*
  Warnings:

  - You are about to drop the column `cittedComments` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "cittedComments",
ADD COLUMN     "cittedCommentsId" INTEGER[];
