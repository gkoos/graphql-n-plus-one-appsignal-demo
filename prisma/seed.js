import { prisma } from "../prismaClient.js";

async function seed() {
  console.log("Seeding database...");

  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const users = await prisma.user.createMany({
    data: [
      { name: "Alice" },
      { name: "Bob" },
      { name: "Charlie" }
    ]
  });

  const allUsers = await prisma.user.findMany();

  for (const user of allUsers) {
    const posts = Array.from({ length: 5 }).map((_, i) => ({
      title: `${user.name}'s Post ${i + 1}`,
      authorId: user.id
    }));
    await prisma.post.createMany({ data: posts });
  }

  console.log("Database seeded!");
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
