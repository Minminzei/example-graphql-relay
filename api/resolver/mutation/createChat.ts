import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLUnionType,
} from "graphql";
import { decode } from "@api/convertId";
import { ChatType, ChatModel } from "@api/types/chat";
import prisma from "@database/lib";
import ErrorType from "@api/types/error";

interface CreateChatInput {
  user_id: string;
  title: string;
}

type Result = ChatModel | ErrorType;

const createChatInput = new GraphQLInputObjectType({
  name: "CreateChatInput",
  fields: {
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
});

async function create(data: CreateChatInput): Promise<Result> {
  try {
    const { id } = await prisma.chat.create({
      data: {
        title: data.title,
        user_id: decode(data.user_id),
      },
    });
    const chat = await prisma.chat.findUnique({
      where: {
        id,
      },
      include: { user: true },
    });
    if (!chat) {
      throw new Error("チャットを作成できませんでした");
    }
    return new ChatModel(chat);
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}

const ChatCreatedErrorType = new GraphQLObjectType({
  name: "ChatCreatedError",
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ChatCreatedResultType = new GraphQLUnionType({
  name: "ChatCreatedResult",
  types: [ChatType, ChatCreatedErrorType],
  resolveType: (value) => {
    if (value instanceof ChatModel) {
      return "Chat";
    }
    return "ChatCreatedError";
  },
});

const createChat = {
  type: new GraphQLNonNull(ChatCreatedResultType),
  args: {
    input: { type: new GraphQLNonNull(createChatInput) },
  },
  resolve(obj: any, { input }: { input: CreateChatInput }): Promise<Result> {
    return new Promise(async (resolve) => {
      const result = await create(input);
      resolve(result);
    });
  },
};

export default createChat;
