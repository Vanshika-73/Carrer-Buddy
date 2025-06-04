/*
  Warnings:

  - You are about to drop the column `SubIndustry` on the `SubIndustryInsight` table. All the data in the column will be lost.
  - You are about to drop the column `SubIndustry` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subIndustry]` on the table `SubIndustryInsight` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subIndustry` to the `SubIndustryInsight` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_SubIndustry_fkey";

-- DropIndex
DROP INDEX "SubIndustryInsight_SubIndustry_idx";

-- DropIndex
DROP INDEX "SubIndustryInsight_SubIndustry_key";

-- AlterTable
ALTER TABLE "SubIndustryInsight" DROP COLUMN "SubIndustry",
ADD COLUMN     "subIndustry" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "SubIndustry",
ADD COLUMN     "subIndustry" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "SubIndustryInsight_subIndustry_key" ON "SubIndustryInsight"("subIndustry");

-- CreateIndex
CREATE INDEX "SubIndustryInsight_subIndustry_idx" ON "SubIndustryInsight"("subIndustry");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subIndustry_fkey" FOREIGN KEY ("subIndustry") REFERENCES "SubIndustryInsight"("subIndustry") ON DELETE SET NULL ON UPDATE CASCADE;
