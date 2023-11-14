/*
  Warnings:

  - You are about to drop the column `destinoAtendimentoId` on the `Chamadas` table. All the data in the column will be lost.
  - Added the required column `destinoAtendimento` to the `Chamadas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chamadas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paciente" TEXT NOT NULL,
    "destinoAtendimento" TEXT NOT NULL,
    "hora" DATETIME NOT NULL
);
INSERT INTO "new_Chamadas" ("hora", "id", "paciente") SELECT "hora", "id", "paciente" FROM "Chamadas";
DROP TABLE "Chamadas";
ALTER TABLE "new_Chamadas" RENAME TO "Chamadas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
