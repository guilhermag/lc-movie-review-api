/*
  Warnings:

  - A unique constraint covering the columns `[idIMDB]` on the table `movies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idIMDB` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "idIMDB" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "movies_idIMDB_key" ON "movies"("idIMDB");
