-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('PlanToPlay', 'Dropped', 'Completed', 'Playing');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "playStatus" "Progress" NOT NULL DEFAULT E'PlanToPlay';
