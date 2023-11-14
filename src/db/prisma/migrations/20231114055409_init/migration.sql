/*
  Warnings:

  - You are about to drop the column `alertasId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `chamadasId` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "nome" TEXT,
    "nomeTratamento" TEXT,
    "senha" TEXT,
    "tratamentoId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "User_tratamentoId_fkey" FOREIGN KEY ("tratamentoId") REFERENCES "Tratamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "id", "isActive", "nome", "nomeTratamento", "roleId", "senha", "tratamentoId") SELECT "email", "id", "isActive", "nome", "nomeTratamento", "roleId", "senha", "tratamentoId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
