/*
  Warnings:

  - Made the column `color` on table `ProductSaleRelations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customEngraving` on table `ProductSaleRelations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productNote` on table `ProductSaleRelations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductSaleRelations" ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" SET DEFAULT 'N/A',
ALTER COLUMN "customEngraving" SET NOT NULL,
ALTER COLUMN "customEngraving" SET DEFAULT 'N/A',
ALTER COLUMN "productNote" SET NOT NULL,
ALTER COLUMN "productNote" SET DEFAULT 'N/A';
