-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chamadas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paciente" TEXT NOT NULL,
    "destinoAtendimento" TEXT NOT NULL,
    "hora" DATETIME NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Chamadas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Chamadas" ("destinoAtendimento", "hora", "id", "paciente") SELECT "destinoAtendimento", "hora", "id", "paciente" FROM "Chamadas";
DROP TABLE "Chamadas";
ALTER TABLE "new_Chamadas" RENAME TO "Chamadas";
CREATE TABLE "new_Alertas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identificador" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "hora" DATETIME NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Alertas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Alertas" ("hora", "id", "identificador", "mensagem") SELECT "hora", "id", "identificador", "mensagem" FROM "Alertas";
DROP TABLE "Alertas";
ALTER TABLE "new_Alertas" RENAME TO "Alertas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
