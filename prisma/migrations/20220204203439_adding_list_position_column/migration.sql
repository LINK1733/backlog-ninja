/*
  Warnings:

  - A unique constraint covering the columns `[listPosition]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "listPosition" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_listPosition_key" ON "Game"("listPosition");
