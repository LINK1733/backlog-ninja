-- DropIndex
DROP INDEX "Game_listPosition_key";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "listPosition" DROP DEFAULT;
DROP SEQUENCE "Game_listPosition_seq";
