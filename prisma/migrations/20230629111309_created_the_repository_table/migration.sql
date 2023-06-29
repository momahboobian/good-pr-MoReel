-- CreateTable
CREATE TABLE "Repository" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "owner" TEXT,
    "team_name" TEXT,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);
