/*
  Warnings:

  - You are about to drop the `_igdbGameToigdbGameAlternativeName` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `igdbGameAlternativeName` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_igdbGameToigdbGameAlternativeName" DROP CONSTRAINT "_igdbGameToigdbGameAlternativeName_A_fkey";

-- DropForeignKey
ALTER TABLE "_igdbGameToigdbGameAlternativeName" DROP CONSTRAINT "_igdbGameToigdbGameAlternativeName_B_fkey";

-- DropTable
DROP TABLE "_igdbGameToigdbGameAlternativeName";

-- DropTable
DROP TABLE "igdbGameAlternativeName";

-- CreateTable
CREATE TABLE "igdbGameName" (
    "id" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "altNameId" INTEGER,
    "name" TEXT NOT NULL,

    CONSTRAINT "igdbGameName_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "igdbGameName_name_idx" ON "igdbGameName"("name");

-- AddForeignKey
ALTER TABLE "igdbGameName" ADD CONSTRAINT "igdbGameName_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "igdbGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
