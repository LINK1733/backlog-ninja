/*
  Warnings:

  - Changed the type of `gameModeId` on the `igdbGame` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `genreId` on the `igdbGame` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `playerPerspectiveId` on the `igdbGame` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `themeId` on the `igdbGame` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "igdbGame" DROP COLUMN "gameModeId",
ADD COLUMN     "gameModeId" JSONB NOT NULL,
DROP COLUMN "genreId",
ADD COLUMN     "genreId" JSONB NOT NULL,
DROP COLUMN "playerPerspectiveId",
ADD COLUMN     "playerPerspectiveId" JSONB NOT NULL,
DROP COLUMN "themeId",
ADD COLUMN     "themeId" JSONB NOT NULL;
