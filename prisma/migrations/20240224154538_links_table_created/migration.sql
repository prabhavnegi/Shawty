-- CreateTable
CREATE TABLE "links" (
    "id" INTEGER NOT NULL,
    "pokemon" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "expiry" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "links_id_key" ON "links"("id");
