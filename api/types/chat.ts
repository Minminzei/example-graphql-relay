import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from "graphql";
import { encode } from "@api/convertId";
import type {
  Chat as PrismaChat,
  User as PrismaUser,
  Post as PrismaPost,
} from "@prisma/client";
import { UserType, UserModel } from "@api/types/user";
import { PostType, PostModel } from "@api/types/post";

const ChatType = new GraphQLObjectType({
  name: "Chat",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
    },
    user: {
      type: new GraphQLNonNull(UserType),
    },
  },
});

class ChatModel {
  id: string;
  title: string;
  user: UserModel;
  posts: PostModel[];
  constructor(
    params: PrismaChat & {
      user: PrismaUser;
      posts?: (PrismaPost & {
        user: PrismaUser;
      })[];
    }
  ) {
    this.id = encode(params.id, "Chat");
    this.title = params.title || "";
    this.user = new UserModel(params.user);
    this.posts = params.posts?.map((row) => new PostModel(row)) || [];
  }
}

export { ChatType, ChatModel };
