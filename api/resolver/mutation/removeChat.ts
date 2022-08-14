import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLUnionType,
  GraphQLString,
} from "graphql";
import fromGlobalId from "@api/fromGlobalId";
import prisma from "@database/lib";
import ErrorType from "@api/types/error";
import { toGlobalId } from "graphql-relay";

interface RemoveChatInput {
  id: string;
  user_id: string;
}

type Result =
  | {
      removeChatId: string;
    }
  | ErrorType;

const removeChatInput = new GraphQLInputObjectType({
  name: "RemoveChatInput",
  fields: {
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
});

async function remove(data: RemoveChatInput): Promise<Result> {
  try {
    const { count } = await prisma.chat.updateMany({
      where: {
        id: fromGlobalId(data.id),
        user_id: fromGlobalId(data.user_id),
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    if (count !== 1) {
      throw new Error("チャットを削除できませんでした");
    }
    const chat = await prisma.chat.findUnique({
      where: {
        id: fromGlobalId(data.id),
      },
      include: {
        user: true,
      },
    });
    if (!chat) {
      throw new Error("チャットを削除できませんでした");
    }
    return {
      removeChatId: toGlobalId("Chat", chat.id),
    };
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}

export default {
  type: new GraphQLNonNull(
    new GraphQLUnionType({
      name: "RemoveChatResult",
      types: [
        new GraphQLObjectType({
          name: "RemoveChatId",
          fields: {
            removeChatId: {
              type: new GraphQLNonNull(GraphQLID),
            },
          },
        }),
        new GraphQLObjectType({
          name: "RemoveChatError",
          fields: {
            message: { type: new GraphQLNonNull(GraphQLString) },
          },
        }),
      ],
      resolveType: (value) => {
        if (value.removeChatId) {
          return "RemoveChatId";
        }
        return "RemoveChatError";
      },
    })
  ),
  args: {
    input: { type: new GraphQLNonNull(removeChatInput) },
  },
  resolve(obj: any, { input }: { input: RemoveChatInput }): Promise<Result> {
    return new Promise(async (resolve) => {
      const result = await remove(input);
      resolve(result);
    });
  },
};
