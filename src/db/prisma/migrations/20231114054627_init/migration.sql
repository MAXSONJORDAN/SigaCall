/*
  Warnings:

  - Added the required column `destinoAtendimentoId` to the `Chamadas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chamadas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paciente" TEXT NOT NULL,
    "destinoAtendimentoId" INTEGER NOT NULL,
    "hora" DATETIME NOT NULL,
    CONSTRAINT "Chamadas_destinoAtendimentoId_fkey" FOREIGN KEY ("destinoAtendimentoId") REFERENCES "DestinoAtendimento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chamadas" ("hora", "id", "paciente") SELECT "hora", "id", "paciente" FROM "Chamadas";
DROP TABLE "Chamadas";
ALTER TABLE "new_Chamadas" RENAME TO "Chamadas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
