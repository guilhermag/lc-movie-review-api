/*
  Warnings:

  - Added the required column `description` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieScore` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "movieScore" INTEGER NOT NULL;
