import prisma from "lib/prisma.js";

export default async function handler(req, res) {
  try {
    const repos = await prisma.repository.findMany();
    res.status(200).json(repos);
  } catch (error) {
    console.error("Error fetching repositories:", error);
    res.status(500).json({
      message: "An unexpected error occurred while fetching repositories.",
    });
  } finally {
    await prisma.$disconnect();
  }
}
