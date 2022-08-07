import { GraphQLNonNull, GraphQLList, GraphQLID } from "graphql";
import { ChatType, ChatModel } from "@api/types/chat";
import { UserModel } from "@api/types/user";
import { decode } from "@api/convertId";
import type {
  User as PrismaUser,
  Chat as PrismaChat,
  Prisma,
} from "@prisma/client";
import prisma from "@database/lib";

interface ChatsParams {
  user_id?: string;
}

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

async function find(params: ChatsParams): Promise<Chat[]> {
  try {
    const where: Prisma.ChatWhereInput | undefined = {};
    if (params.user_id) {
      where.user_id = decode(params.user_id);
    }
    const chats = await prisma.chat.findMany({
      where,
      include: { user: true },
    });
    return chats.map((chat) => new Chat(chat));
  } catch (e) {
    throw e;
  }
}

const chats = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ChatType))),
  args: {
    user_id: {
      type: GraphQLID,
    },
  },
  resolve(obj: any, args: ChatsParams): Promise<Chat[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await find(args);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default chats;
