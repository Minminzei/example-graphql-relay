import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLUnionType,
  GraphQLString,
} from "graphql";
import { decode } from "@api/convertId";
import prisma from "@database/lib";
import ErrorType from "@api/types/error";

interface RemoveChatInput {
  id: string;
  user_id: string;
}

type Result =
  | {
      id: string;
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
        id: decode(data.id),
        user_id: decode(data.user_id),
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    if (count !== 1) {
      throw new Error("チャットを削除できませんでした");
    }
    return {
      id: data.id,
    };
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}

const ChatRemovedType = new GraphQLObjectType({
  name: "ChatRemovedSuccess",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
});

const ChatRemovedErrorType = new GraphQLObjectType({
  name: "ChatRemovedError",
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ChatRemovedResultType = new GraphQLUnionType({
  name: "ChatRemovedResult",
  types: [ChatRemovedType, ChatRemovedErrorType],
  resolveType: (value) => {
    if (value.id) {
      return "ChatRemovedSuccess";
    }
    return "ChatRemovedError";
  },
});

const removeChat = {
  type: new GraphQLNonNull(ChatRemovedResultType),
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

export default removeChat;
