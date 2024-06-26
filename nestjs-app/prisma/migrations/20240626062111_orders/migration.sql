/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryStatus` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InventoryStatus" AS ENUM ('INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'DELIVERED', 'RETURNED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "inventoryStatus" "InventoryStatus" NOT NULL,
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_orderId_key" ON "Employee"("orderId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
