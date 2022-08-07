import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLObjectType,
  GraphQLUnionType,
} from "graphql";
import { decode } from "@api/convertId";
import { PostType, PostModel } from "@api/types/post";
import prisma from "@database/lib";
import ErrorType from "@api/types/error";

interface RemovePostInput {
  id: string;
  user_id: string;
}

type Result = PostModel | ErrorType;

const removePostInput = new GraphQLInputObjectType({
  name: "RemovePostInput",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
  },
});

async function remove(data: RemovePostInput): Promise<Result> {
  try {
    return await prisma.$transaction(async (): Promise<PostModel> => {
      const { count } = await prisma.post.updateMany({
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
        throw new Error("メッセージを削除できませんでした");
      }
      const post = await prisma.post.findUnique({
        where: {
          id: decode(data.id),
        },
        include: { user: true },
      });
      if (!post) {
        throw new Error("メッセージを削除できませんでした");
      }
      return new PostModel(post);
    });
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}

const PostRemovedErrorType = new GraphQLObjectType({
  name: "PostRemovedError",
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const PostRemovedResultType = new GraphQLUnionType({
  name: "PostRemovedResult",
  types: [PostType, PostRemovedErrorType],
  resolveType: (value) => {
    if (value instanceof PostModel) {
      return "Post";
    }
    return "PostRemovedError";
  },
});

const removePost = {
  type: new GraphQLNonNull(PostRemovedResultType),
  args: {
    input: { type: new GraphQLNonNull(removePostInput) },
  },
  resolve(obj: any, { input }: { input: RemovePostInput }): Promise<Result> {
    return new Promise(async (resolve) => {
      const result = await remove(input);
      resolve(result);
    });
  },
};

export default removePost;
