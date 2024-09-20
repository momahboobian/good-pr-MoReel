/*
  Warnings:

  - The primary key for the `Repository` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Repository` table. All the data in the column will be lost.
  - Changed the type of `id` on the `Repository` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Repository" DROP CONSTRAINT "Repository_pkey",
DROP COLUMN "name",
DROP COLUMN "owner",
ADD COLUMN     "cohort" TEXT,
ADD COLUMN     "demo_url" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "repo_name" TEXT,
ADD COLUMN     "repo_owner" TEXT,
ADD COLUMN     "repo_url" TEXT,
ADD COLUMN     "statusId" INTEGER,
ADD COLUMN     "total_prs" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3),
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Repository_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
