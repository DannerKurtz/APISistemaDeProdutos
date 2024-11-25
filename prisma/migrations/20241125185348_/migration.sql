/*
  Warnings:

  - You are about to drop the column `materiaPrimaID` on the `RelacaoMateriaPrimaEProdutos` table. All the data in the column will be lost.
  - You are about to drop the column `produtoID` on the `RelacaoMateriaPrimaEProdutos` table. All the data in the column will be lost.
  - Added the required column `materiaPrimaId` to the `RelacaoMateriaPrimaEProdutos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produtoId` to the `RelacaoMateriaPrimaEProdutos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RelacaoMateriaPrimaEProdutos" DROP CONSTRAINT "RelacaoMateriaPrimaEProdutos_materiaPrimaID_fkey";

-- DropForeignKey
ALTER TABLE "RelacaoMateriaPrimaEProdutos" DROP CONSTRAINT "RelacaoMateriaPrimaEProdutos_produtoID_fkey";

-- AlterTable
ALTER TABLE "RelacaoMateriaPrimaEProdutos" DROP COLUMN "materiaPrimaID",
DROP COLUMN "produtoID",
ADD COLUMN     "materiaPrimaId" TEXT NOT NULL,
ADD COLUMN     "produtoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RelacaoMateriaPrimaEProdutos" ADD CONSTRAINT "RelacaoMateriaPrimaEProdutos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelacaoMateriaPrimaEProdutos" ADD CONSTRAINT "RelacaoMateriaPrimaEProdutos_materiaPrimaId_fkey" FOREIGN KEY ("materiaPrimaId") REFERENCES "MateriasPrimas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
