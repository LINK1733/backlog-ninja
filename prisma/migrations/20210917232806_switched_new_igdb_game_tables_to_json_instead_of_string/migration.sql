/*
  Warnings:

  - The `alternativeName` column on the `igdbGame` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gameMode` column on the `igdbGame` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `genre` column on the `igdbGame` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `playerPerspective` column on the `igdbGame` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `theme` column on the `igdbGame` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "igdbGame" DROP COLUMN "alternativeName",
ADD COLUMN     "alternativeName" JSONB,
DROP COLUMN "gameMode",
ADD COLUMN     "gameMode" JSONB,
DROP COLUMN "genre",
ADD COLUMN     "genre" JSONB,
DROP COLUMN "playerPerspective",
ADD COLUMN     "playerPerspective" JSONB,
DROP COLUMN "theme",
ADD COLUMN     "theme" JSONB;

-- CreateIndex
CREATE INDEX "igdbGame_name_alternativeName_idx" ON "igdbGame"("name", "alternativeName");
