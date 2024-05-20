import { PrismaClient } from "@prisma/client";

let prisma;

try {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
} catch (error) {
  console.error("Error initialising PrismaClient:", error.message);
}

export default prisma;
