-- CreateTable
CREATE TABLE "RelacaoMateriaPrimaEProdutos" (
    "id" TEXT NOT NULL,
    "produtoID" TEXT NOT NULL,
    "materiaPrimaID" TEXT NOT NULL,
    "quantidadeMateriaPrima" TEXT NOT NULL,

    CONSTRAINT "RelacaoMateriaPrimaEProdutos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RelacaoMateriaPrimaEProdutos" ADD CONSTRAINT "RelacaoMateriaPrimaEProdutos_produtoID_fkey" FOREIGN KEY ("produtoID") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelacaoMateriaPrimaEProdutos" ADD CONSTRAINT "RelacaoMateriaPrimaEProdutos_materiaPrimaID_fkey" FOREIGN KEY ("materiaPrimaID") REFERENCES "MateriasPrimas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
