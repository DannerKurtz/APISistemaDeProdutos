/*
  Warnings:

  - You are about to drop the column `numero` on the `Vendas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[numeroDaVenda]` on the table `Vendas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clienteId` to the `Vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroDaVenda` to the `Vendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Vendas_numero_key";

-- AlterTable
ALTER TABLE "Vendas" DROP COLUMN "numero",
ADD COLUMN     "clienteId" TEXT NOT NULL,
ADD COLUMN     "numeroDaVenda" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vendas_numeroDaVenda_key" ON "Vendas"("numeroDaVenda");

-- AddForeignKey
ALTER TABLE "Vendas" ADD CONSTRAINT "Vendas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
