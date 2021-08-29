/*
  Warnings:

  - You are about to drop the column `cover` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `gameName` on the `Game` table. All the data in the column will be lost.
  - Added the required column `igdbGameId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "cover",
DROP COLUMN "gameName",
ADD COLUMN     "igdbGameId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD FOREIGN KEY ("igdbGameId") REFERENCES "igdbGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;
