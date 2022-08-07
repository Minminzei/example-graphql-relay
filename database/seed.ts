import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "dog@example.io" },
    update: {},
    create: {
      email: "dog@example.io",
      name: "Jeremy Offley",
      division: "Engineer",
      image:
        "https://raw.githubusercontent.com/Minminzei/pengin/master/src/assets/images/user1.png",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "cat@example.io" },
    update: {},
    create: {
      email: "cat@example.io",
      name: "Patrik Granfeldt",
      division: "Designer",
      image:
        "https://raw.githubusercontent.com/Minminzei/pengin/master/src/assets/images/user2.png",
    },
  });

  await prisma.chat.create({
    data: {
      user_id: user2.id,
      title: "Channel for Photo App Project",
      posts: {
        create: [
          {
            user_id: user2.id,
            content: "Welcome!!",
          },
          {
            user_id: user2.id,
            content: "Let's talk about next our project 'Meta Camera'!",
          },
        ],
      },
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: "bird@example.io" },
    update: {},
    create: {
      email: "bird@example.io",
      name: "Ruth McGwire",
      division: "Business",
      image:
        "https://raw.githubusercontent.com/Minminzei/pengin/master/src/assets/images/user3.png",
    },
  });

  await prisma.chat.create({
    data: {
      user_id: user3.id,
      title: "Report of KPI and Cashflow",
      posts: {
        create: [
          {
            user_id: user3.id,
            content: "Welcome!!",
          },
        ],
      },
    },
  });

  const user4 = await prisma.user.upsert({
    where: { email: "tanaka@example.io" },
    update: {},
    create: {
      email: "tanaka@example.io",
      name: "Mari Tanaka",
      division: "Accounting",
      image:
        "https://raw.githubusercontent.com/Minminzei/pengin/master/src/assets/images/user4.png",
    },
  });
  await prisma.chat.create({
    data: {
      user_id: user4.id,
      title: "Accounting Q & A",
      posts: {
        create: [
          {
            user_id: user4.id,
            content: "Welcome!!",
          },
        ],
      },
    },
  });

  await prisma.chat.create({
    data: {
      user_id: user4.id,
      title: "Free Talk",
      posts: {
        create: [
          {
            user_id: user4.id,
            content: "Welcome!!",
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
