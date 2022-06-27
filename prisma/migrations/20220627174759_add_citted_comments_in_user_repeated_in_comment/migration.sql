-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "repeated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cittedComments" TEXT[];
