-- CreateTable
CREATE TABLE "Vendas" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "desconto" DOUBLE PRECISION NOT NULL,
    "precoTotal" DOUBLE PRECISION NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Vendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelacaoProdutoVenda" (
    "id" TEXT NOT NULL,
    "vendaId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RelacaoProdutoVenda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendas_numero_key" ON "Vendas"("numero");

-- AddForeignKey
ALTER TABLE "Vendas" ADD CONSTRAINT "Vendas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelacaoProdutoVenda" ADD CONSTRAINT "RelacaoProdutoVenda_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelacaoProdutoVenda" ADD CONSTRAINT "RelacaoProdutoVenda_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
