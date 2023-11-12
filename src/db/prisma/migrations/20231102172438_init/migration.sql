/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

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
    CONSTRAINT "User_tratamentoId_fkey" FOREIGN KEY ("tratamentoId") REFERENCES "Tratamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "id", "roleId", "tratamentoId") SELECT "email", "id", "roleId", "tratamentoId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
