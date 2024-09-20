import prisma from "lib/prisma.js";

export default async function handler(req, res) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 60d7b2c6e096f957bb81572040c1c39291ead2f0
}
