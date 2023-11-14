/*
  Warnings:

  - Added the required column `tipo` to the `Chamadas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chamadas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paciente" TEXT NOT NULL,
    "destinoAtendimento" TEXT NOT NULL,
    "hora" DATETIME NOT NULL,
    "tipo" INTEGER NOT NULL
);
INSERT INTO "new_Chamadas" ("destinoAtendimento", "hora", "id", "paciente") SELECT "destinoAtendimento", "hora", "id", "paciente" FROM "Chamadas";
DROP TABLE "Chamadas";
ALTER TABLE "new_Chamadas" RENAME TO "Chamadas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
