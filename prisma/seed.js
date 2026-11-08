const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");

async function main() {
  // Hashing password dengan bcryptjs
  const hashedPassword = await bcrypt.hash("passwordadmin", 10); // '10' adalah salt rounds

  // Data user yang akan di-seed
  const userData = [
    {
      username: "admin1234",
      // Simpan password yang sudah di-hash
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    },
  ];

  // Tambahkan data user ke database
  await prisma.user.createMany({
    data: userData,
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log("Seeding selesai ✅");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
