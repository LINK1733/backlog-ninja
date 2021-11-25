-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_igdbGameId_fkey";

-- DropForeignKey
ALTER TABLE "igdbGameName" DROP CONSTRAINT "igdbGameName_igdbGameId_fkey";

-- DropForeignKey
ALTER TABLE "igdbGameToGameMode" DROP CONSTRAINT "igdbGameToGameMode_gameId_fkey";

-- DropForeignKey
ALTER TABLE "igdbGameToGenre" DROP CONSTRAINT "igdbGameToGenre_gameId_fkey";

-- DropForeignKey
ALTER TABLE "igdbGameToPlayerPerspective" DROP CONSTRAINT "igdbGameToPlayerPerspective_gameId_fkey";

-- DropForeignKey
ALTER TABLE "igdbGameToTheme" DROP CONSTRAINT "igdbGameToTheme_gameId_fkey";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_igdbGameId_fkey" FOREIGN KEY ("igdbGameId") REFERENCES "igdbGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameName" ADD CONSTRAINT "igdbGameName_igdbGameId_fkey" FOREIGN KEY ("igdbGameId") REFERENCES "igdbGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameToPlayerPerspective" ADD CONSTRAINT "igdbGameToPlayerPerspective_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "igdbGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameToGameMode" ADD CONSTRAINT "igdbGameToGameMode_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "igdbGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameToTheme" ADD CONSTRAINT "igdbGameToTheme_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "igdbGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameToGenre" ADD CONSTRAINT "igdbGameToGenre_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "igdbGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;
