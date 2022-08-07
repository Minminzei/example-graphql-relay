import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLUnionType,
} from "graphql";
import { decode } from "@api/convertId";
import { PostType, PostModel } from "@api/types/post";
import prisma from "@database/lib";
import ErrorType from "@api/types/error";

interface CreatePostInput {
  chat_id: string;
  user_id: string;
  content: string;
}

type Result = PostModel | ErrorType;

const createPostInput = new GraphQLInputObjectType({
  name: "CreatePostInput",
  fields: {
    chat_id: { type: new GraphQLNonNull(GraphQLID) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
});

async function create(data: CreatePostInput): Promise<Result> {
  try {
    const { id } = await prisma.post.create({
      data: {
        content: data.content,
        user_id: decode(data.user_id),
        chat_id: decode(data.chat_id),
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
    return new PostModel(post);
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}

const PostCreatedErrorType = new GraphQLObjectType({
  name: "PostCreatedError",
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const PostCreatedResultType = new GraphQLUnionType({
  name: "PostCreatedResult",
  types: [PostType, PostCreatedErrorType],
  resolveType: (value) => {
    if (value instanceof PostModel) {
      return "Post";
    }
    return "PostCreatedError";
  },
});

const createPost = {
  type: new GraphQLNonNull(PostCreatedResultType),
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

export default createPost;
