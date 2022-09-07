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

class ChatError {
  code: string;
  message: string;
  constructor(params: { code: string; message: string }) {
    this.code = params.code;
    this.message = params.message;
  }
}

async function create(data: CreateChatInput): Promise<Result | ChatError> {
  // チャット名の重複チェック
  const check = await prisma.chat.findFirst({
    where: {
      title: data.title,
      deletedAt: null,
    },
  });
  if (check) {
    return new ChatError({
      code: "DEPUCICAPE_NAME",
      message: "このチャット名はすでに使用されています",
    });
  }

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
    return new ChatError({
      code: "FAIL_CRETATE",
      message: "チャットを作成できませんでした",
    });
  }

  return {
    chatEdges: new ChatEdgeModel({
      cursor: id,
      node: new ChatModel(chat),
    }),
  };
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
          name: "ChatDuplicateNameError",
          fields: {
            message: { type: new GraphQLNonNull(GraphQLString) },
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
        } else if (value.code === "DEPUCICAPE_NAME") {
          return "ChatDuplicateNameError";
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
