/*
  Warnings:

  - You are about to drop the column `igdbGameId` on the `igdbGameAlternativeName` table. All the data in the column will be lost.
  - You are about to drop the column `igdbGameId` on the `igdbGameGameMode` table. All the data in the column will be lost.
  - You are about to drop the column `igdbGameId` on the `igdbGameGenre` table. All the data in the column will be lost.
  - You are about to drop the column `igdbGameId` on the `igdbGamePlayerPerspective` table. All the data in the column will be lost.
  - You are about to drop the column `igdbGameId` on the `igdbGameTheme` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "igdbGameAlternativeName" DROP CONSTRAINT "igdbGameAlternativeName_igdbGameId_fkey";

-- DropForeignKey
ALTER TABLE "igdbGameGameMode" DROP CONSTRAINT "igdbGameGameMode_igdbGameId_fkey";

-- DropForeignKey
ALTER TABLE "igdbGameGenre" DROP CONSTRAINT "igdbGameGenre_igdbGameId_fkey";

-- DropForeignKey
ALTER TABLE "igdbGamePlayerPerspective" DROP CONSTRAINT "igdbGamePlayerPerspective_igdbGameId_fkey";

-- DropForeignKey
ALTER TABLE "igdbGameTheme" DROP CONSTRAINT "igdbGameTheme_igdbGameId_fkey";

-- AlterTable
ALTER TABLE "igdbGameAlternativeName" DROP COLUMN "igdbGameId";

-- AlterTable
ALTER TABLE "igdbGameGameMode" DROP COLUMN "igdbGameId";

-- AlterTable
ALTER TABLE "igdbGameGenre" DROP COLUMN "igdbGameId";

-- AlterTable
ALTER TABLE "igdbGamePlayerPerspective" DROP COLUMN "igdbGameId";

-- AlterTable
ALTER TABLE "igdbGameTheme" DROP COLUMN "igdbGameId";

-- CreateTable
CREATE TABLE "_igdbGameToigdbGameAlternativeName" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_igdbGameToigdbGamePlayerPerspective" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_igdbGameToigdbGameGameMode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_igdbGameToigdbGameTheme" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_igdbGameToigdbGameGenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_igdbGameToigdbGameAlternativeName_AB_unique" ON "_igdbGameToigdbGameAlternativeName"("A", "B");

-- CreateIndex
CREATE INDEX "_igdbGameToigdbGameAlternativeName_B_index" ON "_igdbGameToigdbGameAlternativeName"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_igdbGameToigdbGamePlayerPerspective_AB_unique" ON "_igdbGameToigdbGamePlayerPerspective"("A", "B");

-- CreateIndex
CREATE INDEX "_igdbGameToigdbGamePlayerPerspective_B_index" ON "_igdbGameToigdbGamePlayerPerspective"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_igdbGameToigdbGameGameMode_AB_unique" ON "_igdbGameToigdbGameGameMode"("A", "B");

-- CreateIndex
CREATE INDEX "_igdbGameToigdbGameGameMode_B_index" ON "_igdbGameToigdbGameGameMode"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_igdbGameToigdbGameTheme_AB_unique" ON "_igdbGameToigdbGameTheme"("A", "B");

-- CreateIndex
CREATE INDEX "_igdbGameToigdbGameTheme_B_index" ON "_igdbGameToigdbGameTheme"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_igdbGameToigdbGameGenre_AB_unique" ON "_igdbGameToigdbGameGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_igdbGameToigdbGameGenre_B_index" ON "_igdbGameToigdbGameGenre"("B");

-- AddForeignKey
ALTER TABLE "_igdbGameToigdbGameAlternativeName" ADD FOREIGN KEY ("A") REFERENCES "igdbGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_igdbGameToigdbGameAlternativeName" ADD FOREIGN KEY ("B") REFERENCES "igdbGameAlternativeName"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_igdbGameToigdbGamePlayerPerspective" ADD FOREIGN KEY ("A") REFERENCES "igdbGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_igdbGameToigdbGamePlayerPerspective" ADD FOREIGN KEY ("B") REFERENCES "igdbGamePlayerPerspective"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_igdbGameToigdbGameGameMode" ADD FOREIGN KEY ("A") REFERENCES "igdbGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_igdbGameToigdbGameGameMode" ADD FOREIGN KEY ("B") REFERENCES "igdbGameGameMode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_igdbGameToigdbGameTheme" ADD FOREIGN KEY ("A") REFERENCES "igdbGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_igdbGameToigdbGameTheme" ADD FOREIGN KEY ("B") REFERENCES "igdbGameTheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_igdbGameToigdbGameGenre" ADD FOREIGN KEY ("A") REFERENCES "igdbGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_igdbGameToigdbGameGenre" ADD FOREIGN KEY ("B") REFERENCES "igdbGameGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
