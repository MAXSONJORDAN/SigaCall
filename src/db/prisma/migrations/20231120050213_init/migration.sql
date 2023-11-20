-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chamadas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paciente" TEXT NOT NULL,
    "destinoAtendimento" TEXT,
    "mensagem" TEXT,
    "velocidade" TEXT,
    "repeticoes" TEXT,
    "repeticoesAlertas" TEXT,
    "voz" TEXT,
    "hora" DATETIME NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Chamadas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Chamadas" ("destinoAtendimento", "hora", "id", "paciente", "userId") SELECT "destinoAtendimento", "hora", "id", "paciente", "userId" FROM "Chamadas";
DROP TABLE "Chamadas";
ALTER TABLE "new_Chamadas" RENAME TO "Chamadas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
