import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  try {
    prisma = new PrismaClient();
  } catch (error) {
    console.error("Error initialising PrismaClient:", error.message);
  }
} else {
  if (!global.prisma) {
    try {
      global.prisma = new PrismaClient();
    } catch (error) {
      console.error("Error initialising PrismaClient:", error.message);
    }
  }
  prisma = global.prisma;
}

export default prisma;
