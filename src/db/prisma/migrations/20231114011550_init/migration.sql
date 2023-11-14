/*
  Warnings:

  - You are about to drop the `Consultorio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Consultorio";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DestinoAtendimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identificador" TEXT NOT NULL,
    "pronuncia" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "DestinoAtendimento_identificador_key" ON "DestinoAtendimento"("identificador");
