/*
  Warnings:

  - A unique constraint covering the columns `[listPosition,parentListId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Game_listPosition_parentListId_key" ON "Game"("listPosition", "parentListId");
