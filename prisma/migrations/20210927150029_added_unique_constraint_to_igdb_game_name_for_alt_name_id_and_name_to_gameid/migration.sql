/*
  Warnings:

  - A unique constraint covering the columns `[altNameId]` on the table `igdbGameName` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,igdbGameId]` on the table `igdbGameName` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[altNameId,igdbGameId]` on the table `igdbGameName` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "igdbGameName_altNameId_key" ON "igdbGameName"("altNameId");

-- CreateIndex
CREATE UNIQUE INDEX "igdbGameName_name_igdbGameId_key" ON "igdbGameName"("name", "igdbGameId");

-- CreateIndex
CREATE UNIQUE INDEX "igdbGameName_altNameId_igdbGameId_key" ON "igdbGameName"("altNameId", "igdbGameId");
