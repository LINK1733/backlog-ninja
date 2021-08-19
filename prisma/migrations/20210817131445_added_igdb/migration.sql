-- CreateTable
CREATE TABLE "igdbGame" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "igdbGame.id_unique" ON "igdbGame"("id");
