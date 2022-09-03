import { GraphQLNonNull } from "graphql";
import prisma from "@database/lib";
import guestId from "@api/guestId";
import type { Prisma } from "@prisma/client";
import {
  connectionArgs,
  connectionFromArray,
  ConnectionArguments,
  Connection,
} from "graphql-relay";
import { ChatModel, ChatConnection } from "@api/types/chat";

interface Query extends ConnectionArguments {
  user_id?: string;
}

async function find(): Promise<ChatModel[]> {
  try {
    const where: Prisma.ChatWhereInput = {
      user_id: guestId,
      deletedAt: null,
    };
    const chats = await prisma.chat.findMany({
      where,
      include: { user: true },
    });
    return chats.map((chat) => new ChatModel(chat));
  } catch (e) {
    throw e;
  }
}

export default {
  type: new GraphQLNonNull(ChatConnection),
  args: {
    ...connectionArgs,
  },
  resolve(obj: undefined, args: Query): Promise<Connection<ChatModel>> {
    return new Promise(async (resolve, reject) => {
      try {
        const chats = await find();
        resolve(connectionFromArray(chats, args));
      } catch (e) {
        reject(e);
      }
    });
  },
};
