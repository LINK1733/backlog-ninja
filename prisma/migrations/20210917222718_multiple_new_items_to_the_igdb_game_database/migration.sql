-- DropIndex
DROP INDEX "igdbGame_name_idx";

-- AlterTable
ALTER TABLE "igdbGame" ADD COLUMN     "alternativeName" TEXT[],
ADD COLUMN     "gameMode" TEXT[],
ADD COLUMN     "genre" TEXT[],
ADD COLUMN     "multiplayerMode" TEXT[],
ADD COLUMN     "playerPerspective" TEXT[],
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "theme" TEXT[];

-- CreateIndex
CREATE INDEX "igdbGame_name_alternativeName_idx" ON "igdbGame"("name", "alternativeName");
