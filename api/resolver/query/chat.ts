import { GraphQLNonNull, GraphQLID } from "graphql";
import prisma from "@database/lib";
import fromGlobalId from "@api/fromGlobalId";
import { ChatModel, ChatType } from "@api/types/chat";

async function get(id: string): Promise<ChatModel> {
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: fromGlobalId(id),
      },
      include: {
        user: true,
      },
    });
    if (!chat || chat.deletedAt) {
      throw new Error("Not Found");
    }
    return new ChatModel(chat);
  } catch (e) {
    throw e;
  }
}

export default {
  type: new GraphQLNonNull(ChatType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(ogj: undefined, args: { id: string }): Promise<ChatModel> {
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
