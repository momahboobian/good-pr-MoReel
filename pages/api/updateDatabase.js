import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateDatabase(dataSheet) {
  if (!dataSheet || dataSheet.length === 0) {
    throw new Error("No data to update in the database");
  }

  try {
    await prisma.repository.createMany({
      data: dataSheet,
      skipDuplicates: true,
    });
    console.log("Database updated successfully");
  } catch (error) {
    console.error("Error updating database:", error);
    throw new Error("Error updating database");
  }
}
