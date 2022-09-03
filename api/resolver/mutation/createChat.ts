import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLUnionType,
} from "graphql";
import fromGlobalId from "@api/fromGlobalId";
import { ChatModel, ChatEdgeModel, ChatEdgeType } from "@api/types/chat";
import prisma from "@database/lib";
import ErrorType from "@api/types/error";

interface CreateChatInput {
  user_id: string;
  title: string;
}

type Result =
  | {
      chatEdges: ChatEdgeModel;
    }
  | ErrorType;

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
        user_id: fromGlobalId(data.user_id),
      },
    });
    const chat = await prisma.chat.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    if (!chat) {
      throw new Error("チャットを作成できませんでした");
    }

    return {
      chatEdges: new ChatEdgeModel({
        cursor: id,
        node: new ChatModel(chat),
      }),
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
      name: "ChatCreatedResult",
      types: [
        new GraphQLObjectType({
          name: "ChatEdges",
          fields: {
            chatEdges: {
              type: ChatEdgeType,
            },
          },
        }),
        new GraphQLObjectType({
          name: "ChatCreatedError",
          fields: {
            message: { type: new GraphQLNonNull(GraphQLString) },
          },
        }),
      ],
      resolveType: (value) => {
        if (value.chatEdges instanceof ChatEdgeModel) {
          return "ChatEdges";
        }
        return "ChatCreatedError";
      },
    })
  ),
  args: {
    input: { type: new GraphQLNonNull(createChatInput) },
  },
  resolve(
    obj: undefined,
    { input }: { input: CreateChatInput }
  ): Promise<Result> {
    return new Promise(async (resolve) => {
      const result = await create(input);
      resolve(result);
    });
  },
};
