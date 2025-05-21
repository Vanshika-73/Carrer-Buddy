/*
  Warnings:

  - You are about to drop the column `industry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `IndustryInsight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_industry_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "industry",
ADD COLUMN     "SubIndustry" TEXT;

-- DropTable
DROP TABLE "IndustryInsight";

-- CreateTable
CREATE TABLE "SubIndustryInsight" (
    "id" TEXT NOT NULL,
    "SubIndustry" TEXT NOT NULL,
    "salaryRanges" JSONB[],
    "growthRate" DOUBLE PRECISION NOT NULL,
    "demandLevel" TEXT NOT NULL,
    "topSkills" TEXT[],
    "marketOutlook" TEXT NOT NULL,
    "keyTrends" TEXT[],
    "recommendedSkills" TEXT[],
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubIndustryInsight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubIndustryInsight_SubIndustry_key" ON "SubIndustryInsight"("SubIndustry");

-- CreateIndex
CREATE INDEX "SubIndustryInsight_SubIndustry_idx" ON "SubIndustryInsight"("SubIndustry");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_SubIndustry_fkey" FOREIGN KEY ("SubIndustry") REFERENCES "SubIndustryInsight"("SubIndustry") ON DELETE SET NULL ON UPDATE CASCADE;
