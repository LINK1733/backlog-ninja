/*
  Warnings:

  - A unique constraint covering the columns `[igdbGameId,parentListId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Game.igdbGameId_parentListId_unique" ON "Game"("igdbGameId", "parentListId");
