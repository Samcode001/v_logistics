/*
  Warnings:

  - You are about to drop the column `location` on the `Trucker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trucker" DROP COLUMN "location",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;
