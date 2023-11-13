-- CreateTable
CREATE TABLE "Consultorio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identificador" TEXT NOT NULL,
    "pronuncia" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Consultorio_identificador_key" ON "Consultorio"("identificador");
