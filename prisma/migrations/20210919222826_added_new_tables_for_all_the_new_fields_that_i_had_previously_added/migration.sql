/*
  Warnings:

  - You are about to drop the column `alternativeName` on the `igdbGame` table. All the data in the column will be lost.
  - You are about to drop the column `gameMode` on the `igdbGame` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `igdbGame` table. All the data in the column will be lost.
  - You are about to drop the column `playerPerspective` on the `igdbGame` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `igdbGame` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "igdbGame_name_alternativeName_idx";

-- AlterTable
ALTER TABLE "igdbGame" DROP COLUMN "alternativeName",
DROP COLUMN "gameMode",
DROP COLUMN "genre",
DROP COLUMN "playerPerspective",
DROP COLUMN "theme";

-- CreateTable
CREATE TABLE "igdbGameAlternativeName" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "igdbGameId" INTEGER,

    CONSTRAINT "igdbGameAlternativeName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "igdbGamePlayerPerspective" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "igdbGameId" INTEGER,

    CONSTRAINT "igdbGamePlayerPerspective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "igdbGameGameMode" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "igdbGameId" INTEGER,

    CONSTRAINT "igdbGameGameMode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "igdbGameTheme" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "igdbGameId" INTEGER,

    CONSTRAINT "igdbGameTheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "igdbGameGenre" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "igdbGameId" INTEGER,

    CONSTRAINT "igdbGameGenre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "igdbGameAlternativeName_id_key" ON "igdbGameAlternativeName"("id");

-- CreateIndex
CREATE INDEX "igdbGameAlternativeName_name_idx" ON "igdbGameAlternativeName"("name");

-- CreateIndex
CREATE UNIQUE INDEX "igdbGamePlayerPerspective_id_key" ON "igdbGamePlayerPerspective"("id");

-- CreateIndex
CREATE UNIQUE INDEX "igdbGameGameMode_id_key" ON "igdbGameGameMode"("id");

-- CreateIndex
CREATE UNIQUE INDEX "igdbGameTheme_id_key" ON "igdbGameTheme"("id");

-- CreateIndex
CREATE UNIQUE INDEX "igdbGameGenre_id_key" ON "igdbGameGenre"("id");

-- CreateIndex
CREATE INDEX "igdbGame_name_idx" ON "igdbGame"("name");

-- AddForeignKey
ALTER TABLE "igdbGameAlternativeName" ADD CONSTRAINT "igdbGameAlternativeName_igdbGameId_fkey" FOREIGN KEY ("igdbGameId") REFERENCES "igdbGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGamePlayerPerspective" ADD CONSTRAINT "igdbGamePlayerPerspective_igdbGameId_fkey" FOREIGN KEY ("igdbGameId") REFERENCES "igdbGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameGameMode" ADD CONSTRAINT "igdbGameGameMode_igdbGameId_fkey" FOREIGN KEY ("igdbGameId") REFERENCES "igdbGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameTheme" ADD CONSTRAINT "igdbGameTheme_igdbGameId_fkey" FOREIGN KEY ("igdbGameId") REFERENCES "igdbGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "igdbGameGenre" ADD CONSTRAINT "igdbGameGenre_igdbGameId_fkey" FOREIGN KEY ("igdbGameId") REFERENCES "igdbGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;
