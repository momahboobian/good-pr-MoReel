import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function replaceData(dataSheet) {
  try {
    await prisma.repository.deleteMany({});

    await prisma.repository.createMany({
      data: dataSheet.data,
      skipDuplicates: true,
    });
    console.log("Database updated successfully");
  } catch (error) {
    console.error("Error updating database:", error);
    throw new Error("Error updating database");
  }
}

export async function updateData(dataSheet) {
  try {
    for (const data of dataSheet.data) {
      await prisma.repository.upsert({
        where: { id: data.id },
        update: {
          team_name: data.team_name,
          repo_name: data.repo_name,
          repo_owner: data.repo_owner,
          repo_url: data.repo_url,
          cohort: data.cohort,
          demo_url: data.demo_url,
        },
        create: {
          id: data.id,
          team_name: data.team_name,
          repo_name: data.repo_name,
          repo_owner: data.repo_owner,
          repo_url: data.repo_url,
          cohort: data.cohort,
          demo_url: data.demo_url,
        },
      });
    }
    console.log("Database updated successfully");
  } catch (error) {
    console.error("Error updating database:", error);
    throw new Error("Error updating database");
  }
}

export async function processData(dataSheet, action) {
  if (!dataSheet || dataSheet.length === 0) {
    throw new Error("No data to update in the database");
  }

  if (action === "replace") {
    await replaceData(dataSheet);
  } else if (action === "update") {
    await updateData(dataSheet);
  } else {
    throw new Error("Invalid action!");
  }
}
