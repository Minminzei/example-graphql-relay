import { GraphQLNonNull, GraphQLID } from "graphql";
import { decode } from "@api/convertId";
import { ChatType, ChatModel } from "@api/types/chat";
import prisma from "@database/lib";

async function get(id: string): Promise<ChatModel> {
  try {
    const data = await prisma.chat.findUnique({
      where: {
        id: decode(id),
      },
      include: {
        user: true,
        posts: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!data) {
      throw new Error("Not Found");
    }
    return new ChatModel(data);
  } catch (e) {
    throw e;
  }
}

const chat = {
  type: new GraphQLNonNull(ChatType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(obj: any, args: any): Promise<ChatModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await get(args.id);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default chat;
