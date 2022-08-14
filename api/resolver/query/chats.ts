import { GraphQLNonNull, GraphQLID } from "graphql";
import prisma from "@database/lib";
import type { Prisma } from "@prisma/client";
import {
  connectionArgs,
  connectionFromArray,
  ConnectionArguments,
  Connection,
} from "graphql-relay";
import fromGlobalId from "@api/fromGlobalId";
import { ChatModel, ChatConnection } from "@api/types/chat";

interface Query extends ConnectionArguments {
  user_id?: string;
}

async function find(userId?: string): Promise<ChatModel[]> {
  try {
    const where: Prisma.ChatWhereInput = {
      deletedAt: null,
    };
    if (userId) {
      const id = fromGlobalId(userId);
      where.user_id = id;
    }
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
    user_id: {
      type: GraphQLID,
    },
  },
  resolve(obj: undefined, args: Query): Promise<Connection<ChatModel>> {
    return new Promise(async (resolve, reject) => {
      try {
        const chats = await find(args.user_id);
        resolve(connectionFromArray(chats, args));
      } catch (e) {
        reject(e);
      }
    });
  },
};
