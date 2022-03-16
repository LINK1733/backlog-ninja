-- DropIndex
DROP INDEX "igdbGameName_name_idx";

-- CreateIndex
CREATE INDEX "igdbGameName_igdbGameId_idx" ON "igdbGameName"("igdbGameId");
