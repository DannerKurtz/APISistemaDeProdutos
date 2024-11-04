/*
  Warnings:

  - You are about to drop the column `cnpj` on the `Clientes` table. All the data in the column will be lost.
  - You are about to drop the column `contato` on the `Clientes` table. All the data in the column will be lost.
  - You are about to drop the `Usuarios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bairro` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `celular` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf_cnpj` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inscricao_estadual` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_do_contato` to the `Clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clientes" DROP COLUMN "cnpj",
DROP COLUMN "contato",
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "celular" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "cpf_cnpj" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "inscricao_estadual" TEXT NOT NULL,
ADD COLUMN     "nome_do_contato" TEXT NOT NULL;

-- DropTable
DROP TABLE "Usuarios";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "permissionId" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "nivel" INTEGER,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permission_nome_key" ON "Permission"("nome");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
