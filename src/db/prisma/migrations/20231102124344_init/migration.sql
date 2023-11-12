/*
  Warnings:

  - You are about to drop the column `name` on the `Tratamento` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Tratamento` table. All the data in the column will be lost.
  - Added the required column `pronuncia` to the `Tratamento` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tratamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pronuncia" TEXT NOT NULL,
    "indetificador" TEXT
);
INSERT INTO "new_Tratamento" ("id") SELECT "id" FROM "Tratamento";
DROP TABLE "Tratamento";
ALTER TABLE "new_Tratamento" RENAME TO "Tratamento";
CREATE UNIQUE INDEX "Tratamento_pronuncia_key" ON "Tratamento"("pronuncia");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
