/*
  Warnings:

  - Added the required column `gameModeId` to the `igdbGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genreId` to the `igdbGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerPerspectiveId` to the `igdbGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themeId` to the `igdbGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "igdbGame" ADD COLUMN     "gameModeId" INTEGER NOT NULL,
ADD COLUMN     "genreId" INTEGER NOT NULL,
ADD COLUMN     "playerPerspectiveId" INTEGER NOT NULL,
ADD COLUMN     "themeId" INTEGER NOT NULL;
