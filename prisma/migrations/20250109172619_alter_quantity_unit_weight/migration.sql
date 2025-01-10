/*
  Warnings:

  - You are about to drop the column `quantity` on the `RawMaterials` table. All the data in the column will be lost.
  - Added the required column `unitWeight` to the `RawMaterials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RawMaterials" DROP COLUMN "quantity",
ADD COLUMN     "unitWeight" DOUBLE PRECISION NOT NULL;
