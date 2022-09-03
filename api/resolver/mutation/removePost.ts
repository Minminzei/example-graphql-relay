import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLObjectType,
  GraphQLUnionType,
} from "graphql";
import fromGlobalId from "@api/fromGlobalId";
import { PostModel, PostEdgeType, PostEdgeModel } from "@api/types/post";
import prisma from "@database/lib";
import ErrorType from "@api/types/error";
import { toGlobalId } from "graphql-relay";

interface RemovePostInput {
  id: string;
  user_id: string;
}

type Result =
  | {
      removePostId: string;
    }
  | ErrorType;

const removePostInput = new GraphQLInputObjectType({
  name: "RemovePostInput",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
  },
});

async function remove(data: RemovePostInput): Promise<Result> {
  try {
    const { count } = await prisma.post.updateMany({
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
      throw new Error("メッセージを削除できませんでした");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: fromGlobalId(data.id),
      },
      include: { user: true },
    });
    if (!post) {
      throw new Error("メッセージを削除できませんでした");
    }
    return {
      removePostId: toGlobalId("Post", post.id),
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
      name: "PostRemovedResult",
      types: [
        new GraphQLObjectType({
          name: "RemovePostId",
          fields: {
            removePostId: {
              type: new GraphQLNonNull(GraphQLID),
            },
          },
        }),
        new GraphQLObjectType({
          name: "PostRemovedError",
          fields: {
            message: { type: new GraphQLNonNull(GraphQLString) },
          },
        }),
      ],
      resolveType: (value) => {
        if (value.removePostId) {
          return "RemovePostId";
        }
        return "PostRemovedError";
      },
    })
  ),
  args: {
    input: { type: new GraphQLNonNull(removePostInput) },
  },
  resolve(
    obj: undefined,
    { input }: { input: RemovePostInput }
  ): Promise<Result> {
    return new Promise(async (resolve) => {
      const result = await remove(input);
      resolve(result);
    });
  },
};
