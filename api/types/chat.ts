import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  ConnectionArguments,
  Connection,
  toGlobalId,
  offsetToCursor,
} from "graphql-relay";
import prisma from "@database/lib";
import type { Chat, User } from "@prisma/client";
import fromGlobalId from "@api/fromGlobalId";
import { UserType, UserModel } from "@api/types/user";
import { PostModel, PostConnection } from "@api/types/post";
import NodeType from "@api/types/node";

const ChatType: GraphQLObjectType = new GraphQLObjectType({
  name: "Chat",
  interfaces: () => [NodeType],
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    user: {
      type: new GraphQLNonNull(UserType),
    },
    posts: {
      type: PostConnection,
      args: connectionArgs,
      resolve(
        obj: UserModel,
        args: ConnectionArguments
      ): Promise<Connection<PostModel>> {
        return new Promise(async (resolve, reject) => {
          try {
            const posts = await prisma.post.findMany({
              where: {
                chat_id: fromGlobalId(obj.id),
                deletedAt: null,
              },
              include: { user: true },
              orderBy: { id: "desc" },
            });
            resolve(
              connectionFromArray(
                posts.map((row) => new PostModel(row)),
                args
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      },
    },
  },
});

const { connectionType: ChatConnection, edgeType: ChatEdgeType } =
  connectionDefinitions({
    name: "ChatConnection",
    nodeType: new GraphQLNonNull(ChatType),
  });

class ChatModel {
  id: string;
  title: string;
  user: UserModel;
  constructor(
    params: Chat & {
      user: User;
    }
  ) {
    this.id = toGlobalId("Chat", params.id);
    this.title = params.title || "";
    this.user = new UserModel(params.user);
  }
}

class ChatEdgeModel {
  cursor: string;
  node: ChatModel;
  constructor(params: { cursor: number; node: ChatModel }) {
    this.cursor = offsetToCursor(params.cursor);
    this.node = params.node;
  }
}

export { ChatType, ChatModel, ChatConnection, ChatEdgeType, ChatEdgeModel };
