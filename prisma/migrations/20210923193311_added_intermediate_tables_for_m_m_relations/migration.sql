/*
  Warnings:

  - You are about to drop the column `gameModeId` on the `igdbGame` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `igdbGame` table. All the data in the column will be lost.
  - You are about to drop the column `playerPerspectiveId` on the `igdbGame` table. All the data in the column will be lost.
  - You are about to drop the column `themeId` on the `igdbGame` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `igdbGameName` table. All the data in the column will be lost.
  - You are about to drop the `_igdbGameToigdbGameGameMode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_igdbGameToigdbGameGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_igdbGameToigdbGamePlayerPerspective` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_igdbGameToigdbGameTheme` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `igdbGameId` to the `igdbGameName` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_igdbGameToigdbGameGameMode" DROP CONSTRAINT "_igdbGameToigdbGameGameMode_A_fkey";

-- DropForeignKey
ALTER TABLE "_igdbGameToigdbGameGameMode" DROP CONSTRAINT "_igdbGameToigdbGameGameMode_B_fkey";

-- DropForeignKey
ALTER TABLE "_igdbGameToigdbGameGenre" DROP CONSTRAINT "_igdbGameToigdbGameGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_igdbGameToigdbGameGenre" DROP CONSTRAINT "_igdbGameToigdbGameGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "_igdbGameToigdbGamePlayerPerspective" DROP CONSTRAINT "_igdbGameToigdbGamePlayerPerspective_A_fkey";

-- DropForeignKey
ALTER TABLE "_igdbGameToigdbGamePlayerPerspective" DROP CONSTRAINT "_igdbGameToigdbGamePlayerPerspective_B_fkey";

-- DropForeignKey
ALTER TABLE "_igdbGameToigdbGameTheme" DROP CONSTRAINT "_igdbGameToigdbGameTheme_A_fkey";

-- DropForeignKey
ALTER TABLE "_igdbGameToigdbGameTheme" DROP CONSTRAINT "_igdbGameToigdbGameTheme_B_fkey";

-- DropForeignKey
ALTER TABLE "igdbGameName" DROP CONSTRAINT "igdbGameName_gameId_fkey";

-- AlterTable
ALTER TABLE "igdbGame" DROP COLUMN "gameModeId",
DROP COLUMN "genreId",
DROP COLUMN "playerPerspectiveId",
DROP COLUMN "themeId";

-- AlterTable
ALTER TABLE "igdbGameName" DROP COLUMN "gameId",
ADD COLUMN     "igdbGameId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_igdbGameToigdbGameGameMode";

-- DropTable
DROP TABLE "_igdbGameToigdbGameGenre";

-- DropTable
DROP TABLE "_igdbGameToigdbGamePlayerPerspective";

-- DropTable
DROP TABLE "_igdbGameToigdbGameTheme";

-- CreateTable
CREATE TABLE "igdbGameToPlayerPerspective" (
    "gameId" INTEGER NOT NULL,
    "playerPerspectiveId" INTEGER NOT NULL,

    CONSTRAINT "igdbGameToPlayerPerspective_pkey" PRIMARY KEY ("gameId","playerPerspectiveId")
);

-- CreateTable
CREATE TABLE "igdbGameToGameMode" (
    "gameId" INTEGER NOT NULL,
    "gameModeId" INTEGER NOT NULL,

    CONSTRAINT "igdbGameToGameMode_pkey" PRIMARY KEY ("gameId","gameModeId")
);

-- CreateTable
CREATE TABLE "igdbGameToTheme" (
    "gameId" INTEGER NOT NULL,
    "themeId" INTEGER NOT NULL,

    CONSTRAINT "igdbGameToTheme_pkey" PRIMARY KEY ("gameId","themeId")
);

-- CreateTable
CREATE TABLE "igdbGameToGenre" (
    "gameId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "igdbGameToGenre_pkey" PRIMARY KEY ("gameId","genreId")
);

-- AddForeignKey
ALTER TABLE "igdbGameName" ADD CONSTRAINT "igdbGameName_igdbGameId_fkey" FOREIGN KEY ("igdbGameId") REFERENCES "igdbGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameToPlayerPerspective" ADD CONSTRAINT "igdbGameToPlayerPerspective_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "igdbGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameToPlayerPerspective" ADD CONSTRAINT "igdbGameToPlayerPerspective_playerPerspectiveId_fkey" FOREIGN KEY ("playerPerspectiveId") REFERENCES "igdbGamePlayerPerspective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameToGameMode" ADD CONSTRAINT "igdbGameToGameMode_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "igdbGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameToGameMode" ADD CONSTRAINT "igdbGameToGameMode_gameModeId_fkey" FOREIGN KEY ("gameModeId") REFERENCES "igdbGameGameMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameToTheme" ADD CONSTRAINT "igdbGameToTheme_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "igdbGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameToTheme" ADD CONSTRAINT "igdbGameToTheme_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "igdbGameTheme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameToGenre" ADD CONSTRAINT "igdbGameToGenre_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "igdbGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameToGenre" ADD CONSTRAINT "igdbGameToGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "igdbGameGenre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
