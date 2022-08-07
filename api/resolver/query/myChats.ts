import { GraphQLNonNull, GraphQLList, GraphQLID } from "graphql";
import { ChatType, ChatModel } from "@api/types/chat";
import { UserModel } from "@api/types/user";
import type { User as PrismaUser, Chat as PrismaChat } from "@prisma/client";
import prisma from "@database/lib";
import guestId from "@api/guestId";

class Chat extends ChatModel {
  user: UserModel;
  constructor(
    params: PrismaChat & {
      user: PrismaUser;
    }
  ) {
    super(params);
    this.user = new UserModel(params.user);
  }
}

async function find(): Promise<Chat[]> {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        user_id: guestId,
      },
      include: { user: true },
    });
    return chats.map((chat) => new Chat(chat));
  } catch (e) {
    throw e;
  }
}

const myChats = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ChatType))),
  args: {
    user_id: {
      type: GraphQLID,
    },
  },
  resolve(): Promise<Chat[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await find();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default myChats;
