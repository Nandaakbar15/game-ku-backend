const { PrismaClient } = require("@prisma/client");

// Inisialisasi PrismaClient standar (tanpa adapter untuk Prisma v5)
const prisma = new PrismaClient({
  log: ["error", "warn"],
});

module.exports = prisma;
