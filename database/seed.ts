import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: "dog@example.io" },
    update: {},
    create: {
      email: "dog@example.io",
      name: "Jeremy Offley",
      division: "Engineer",
      image:
        "https://user-images.githubusercontent.com/3320542/183294803-f1ca312f-520e-4b79-8594-6d83547d227a.png",
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
        "https://user-images.githubusercontent.com/3320542/183294800-0b177d6d-5c12-49d3-855a-6ccdbf5e8e7d.png",
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
        "https://user-images.githubusercontent.com/3320542/183294795-2862b867-6640-4288-abbf-61668cc834f7.png",
    },
  });

  await prisma.chat.create({
    data: {
      user_id: user3.id,
      title: "Customer Support",
      posts: {
        create: [
          {
            user_id: user2.id,
            content: "Welcome!!",
          },
          {
            user_id: user1.id,
            content: "コースへ行った事がないのですが、参加できますか？",
          },
          {
            user_id: user2.id,
            content: "はい。参加できます。",
          },
          {
            user_id: user2.id,
            content:
              "未経験、初心者の方から上級者の方まで幅広く対応しております。",
          },
          {
            user_id: user1.id,
            content: "コースレッスンに参加するにはどうすればいいですか？",
          },
          {
            user_id: user2.id,
            content:
              "カード決済を持ってお申し込みが可能です。先着制なので、定員になり次第受付終了となります。",
          },
          {
            user_id: user1.id,
            content: "キャンセルするにはどうしたらいいですか？",
          },
          {
            user_id: user1.id,
            content: "キャンセル料発生の有無について教えてください。",
          },
          {
            user_id: user2.id,
            content:
              "レッスン3日前〜のキャンセル料に関しては参加費の100%をご負担頂きます。",
          },
          {
            user_id: user2.id,
            content:
              "レッスン10日前〜のキャンセル料に関しては参加費の50%をご負担頂きます。",
          },
          {
            user_id: user1.id,
            content: "コースレッスンの中止条件は？",
          },
          {
            user_id: user2.id,
            content:
              "レッスン時間帯に、継続的に3ミリ以上の雨量が予報されている場合が中止になります",
          },
          {
            user_id: user2.id,
            content:
              "キャンセル料が発生することはありません。また、参加費は返金致します。",
          },
          {
            user_id: user2.id,
            content:
              "無断で遅刻・欠席されますと、他の方やゴルフ場に大変迷惑となりますのでご協力お願いします。",
          },
          {
            user_id: user1.id,
            content: "わかりました！",
          },
          {
            user_id: user2.id,
            content:
              "Amazon Payをご利用いただきありがとうございます。 このご注文に関するご質問は、下記「Amazon Pay注文番号」または「お支払い方法設定ID」をクリックし、購入者マイページからお問い合わせください。",
          },
          {
            user_id: user1.id,
            content: "わかりました！",
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
        "https://user-images.githubusercontent.com/3320542/183294806-25dded5c-5b1d-49ae-83c1-b8452f3118f2.png",
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
          {
            user_id: user3.id,
            content: "よろしく！",
          },
          {
            user_id: user2.id,
            content: "Welcome!!",
          },
          {
            user_id: user3.id,
            content: "よろしく！",
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

  await prisma.chat.create({
    data: {
      user_id: user1.id,
      title: "My Channel",
      posts: {
        create: [
          {
            user_id: user1.id,
            content: "Welcome!!",
          },
          {
            user_id: user4.id,
            content: "hi!",
          },
          {
            user_id: user2.id,
            content: "🥰",
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
