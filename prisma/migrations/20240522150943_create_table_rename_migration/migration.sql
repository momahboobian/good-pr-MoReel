/*
  Warnings:

  - The primary key for the `Repository` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Repository` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the column `name` on the `Repository` table to `repo_name`.
  - Changed the column `owner` on the `Repository` table to `repo_owner`.
  - Changed the column `github_url` on the `Repository` table to `repo_url`.
  - A unique constraint covering the columns `[repo_name]` on the table `Repository` will be added. If there are existing duplicate values, this will fail.

  
*/
-- AlterTable
ALTER TABLE "Repository" DROP CONSTRAINT "Repository_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD COLUMN     "github_url" TEXT,
ADD COLUMN     "demo_url" TEXT,
ADD COLUMN     "cohort" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "total_prs" INTEGER,
ADD COLUMN     "statusId" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD CONSTRAINT "Repository_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Repository" RENAME COLUMN "name" TO "repo_name";
ALTER TABLE "Repository" RENAME COLUMN "owner" TO "repo_owner";
ALTER TABLE "Repository" RENAME COLUMN "github_url" TO "repo_url";

-- CreateIndex
CREATE UNIQUE INDEX "Repository_repo_name_key" ON "Repository"("repo_name");

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
