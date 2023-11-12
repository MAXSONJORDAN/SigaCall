/*
  Warnings:

  - You are about to drop the column `indentificador` on the `Tratamento` table. All the data in the column will be lost.
  - Added the required column `identificador` to the `Tratamento` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tratamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identificador" TEXT NOT NULL,
    "pronuncia" TEXT
);
INSERT INTO "new_Tratamento" ("id", "pronuncia") SELECT "id", "pronuncia" FROM "Tratamento";
DROP TABLE "Tratamento";
ALTER TABLE "new_Tratamento" RENAME TO "Tratamento";
CREATE UNIQUE INDEX "Tratamento_identificador_key" ON "Tratamento"("identificador");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
