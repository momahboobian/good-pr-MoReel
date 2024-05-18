import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  try {
    prisma = new PrismaClient();
  } catch (error) {
    console.error("Error initializing PrismaClient:", error);
    process.exit(1); // Exit the process if initialization fails
  }
} else {
  if (!global.prisma) {
    try {
      global.prisma = new PrismaClient();
    } catch (error) {
      console.error("Error initializing PrismaClient:", error);
      process.exit(1); // Exit the process if initialization fails
    }
  }
  prisma = global.prisma;
}

export default prisma;
