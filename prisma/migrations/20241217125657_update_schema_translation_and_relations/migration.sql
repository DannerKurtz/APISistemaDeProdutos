/*
  Warnings:

  - You are about to drop the column `createAt` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the column `nivel` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the `Clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MateriasPrimas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Produtos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RelacaoMateriaPrimaEProdutos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RelacaoProdutoVenda` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vendas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Permissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RelacaoMateriaPrimaEProdutos" DROP CONSTRAINT "RelacaoMateriaPrimaEProdutos_materiaPrimaId_fkey";

-- DropForeignKey
ALTER TABLE "RelacaoMateriaPrimaEProdutos" DROP CONSTRAINT "RelacaoMateriaPrimaEProdutos_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "RelacaoProdutoVenda" DROP CONSTRAINT "RelacaoProdutoVenda_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "RelacaoProdutoVenda" DROP CONSTRAINT "RelacaoProdutoVenda_vendaId_fkey";

-- DropForeignKey
ALTER TABLE "Usuarios" DROP CONSTRAINT "Usuarios_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "Vendas" DROP CONSTRAINT "Vendas_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Vendas" DROP CONSTRAINT "Vendas_usuarioId_fkey";

-- DropIndex
DROP INDEX "Permissions_nome_key";

-- AlterTable
ALTER TABLE "Permissions" DROP COLUMN "createAt",
DROP COLUMN "descricao",
DROP COLUMN "nivel",
DROP COLUMN "nome",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "level" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Clientes";

-- DropTable
DROP TABLE "MateriasPrimas";

-- DropTable
DROP TABLE "Produtos";

-- DropTable
DROP TABLE "RelacaoMateriaPrimaEProdutos";

-- DropTable
DROP TABLE "RelacaoProdutoVenda";

-- DropTable
DROP TABLE "Usuarios";

-- DropTable
DROP TABLE "Vendas";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "permissionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "taxId" TEXT NOT NULL,
    "stateRegistration" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "addressNumber" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawMaterials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RawMaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawMaterialProductRelations" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "rawMaterialId" TEXT NOT NULL,
    "rawMaterialQuantity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RawMaterialProductRelations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "saleNumber" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSaleRelations" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSaleRelations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sales_saleNumber_key" ON "Sales"("saleNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_name_key" ON "Permissions"("name");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RawMaterialProductRelations" ADD CONSTRAINT "RawMaterialProductRelations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RawMaterialProductRelations" ADD CONSTRAINT "RawMaterialProductRelations_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "RawMaterials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSaleRelations" ADD CONSTRAINT "ProductSaleRelations_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSaleRelations" ADD CONSTRAINT "ProductSaleRelations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
