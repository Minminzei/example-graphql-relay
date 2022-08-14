import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLUnionType,
} from "graphql";
import fromGlobalId from "@api/fromGlobalId";
import { PostModel, PostEdgeType, PostEdgeModel } from "@api/types/post";
import prisma from "@database/lib";
import ErrorType from "@api/types/error";

interface CreatePostInput {
  chat_id: string;
  user_id: string;
  content: string;
}

type Result =
  | {
      postEdges: PostEdgeModel;
    }
  | ErrorType;

const createPostInput = new GraphQLInputObjectType({
  name: "CreatePostInput",
  fields: {
    chat_id: { type: new GraphQLNonNull(GraphQLID) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
});

async function create(data: CreatePostInput): Promise<Result> {
  try {
    const { id } = await prisma.post.create({
      data: {
        content: data.content,
        user_id: fromGlobalId(data.user_id),
        chat_id: fromGlobalId(data.chat_id),
      },
    });
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: { user: true },
    });
    if (!post) {
      throw new Error("メッセージを投稿できませんでした");
    }

    return {
      postEdges: new PostEdgeModel({
        node: new PostModel(post),
        cursor: 10,
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
      name: "CreatePostResult",
      types: [
        new GraphQLObjectType({
          name: "PostEdges",
          fields: {
            postEdges: {
              type: PostEdgeType,
            },
          },
        }),
        new GraphQLObjectType({
          name: "CreatePostError",
          fields: {
            message: { type: new GraphQLNonNull(GraphQLString) },
          },
        }),
      ],
      resolveType: (value) => {
        if (value.postEdges instanceof PostEdgeModel) {
          return "PostEdges";
        }
        return "CreatePostError";
      },
    })
  ),
  args: {
    input: { type: new GraphQLNonNull(createPostInput) },
  },
  resolve(obj: any, { input }: { input: CreatePostInput }): Promise<Result> {
    return new Promise(async (resolve) => {
      const result = await create(input);
      resolve(result);
    });
  },
};
