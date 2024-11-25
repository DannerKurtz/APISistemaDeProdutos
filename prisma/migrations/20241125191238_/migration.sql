/*
  Warnings:

  - Changed the type of `quantidadeMateriaPrima` on the `RelacaoMateriaPrimaEProdutos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RelacaoMateriaPrimaEProdutos" DROP COLUMN "quantidadeMateriaPrima",
ADD COLUMN     "quantidadeMateriaPrima" DOUBLE PRECISION NOT NULL;
