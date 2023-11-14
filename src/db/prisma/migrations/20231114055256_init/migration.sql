/*
  Warnings:

  - You are about to drop the column `tipo` on the `Chamadas` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Alertas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identificador" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "hora" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chamadas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paciente" TEXT NOT NULL,
    "destinoAtendimento" TEXT NOT NULL,
    "hora" DATETIME NOT NULL
);
INSERT INTO "new_Chamadas" ("destinoAtendimento", "hora", "id", "paciente") SELECT "destinoAtendimento", "hora", "id", "paciente" FROM "Chamadas";
DROP TABLE "Chamadas";
ALTER TABLE "new_Chamadas" RENAME TO "Chamadas";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "nome" TEXT,
    "nomeTratamento" TEXT,
    "senha" TEXT,
    "tratamentoId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "chamadasId" INTEGER,
    "alertasId" INTEGER,
    CONSTRAINT "User_tratamentoId_fkey" FOREIGN KEY ("tratamentoId") REFERENCES "Tratamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_chamadasId_fkey" FOREIGN KEY ("chamadasId") REFERENCES "Chamadas" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_alertasId_fkey" FOREIGN KEY ("alertasId") REFERENCES "Alertas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "id", "isActive", "nome", "nomeTratamento", "roleId", "senha", "tratamentoId") SELECT "email", "id", "isActive", "nome", "nomeTratamento", "roleId", "senha", "tratamentoId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
