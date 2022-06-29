/*
  Warnings:

  - You are about to drop the column `name` on the `movies` table. All the data in the column will be lost.
  - Added the required column `director` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plot` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" DROP COLUMN "name",
ADD COLUMN     "director" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "plot" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
