import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import { encode } from "@api/convertId";
import type { Post as PrismaPost, User as PrismaUser } from "@prisma/client";
import { UserType, UserModel } from "@api/types/user";

const PostType: any = new GraphQLObjectType({
  name: "Post",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    user: {
      type: new GraphQLNonNull(UserType),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    deletedAt: {
      type: GraphQLString,
    },
  },
});

class PostModel {
  id: string;
  content: string;
  user: UserModel;
  constructor(
    params: PrismaPost & {
      user: PrismaUser;
    }
  ) {
    this.id = encode(params.id, "Post");
    if (params.deletedAt) {
      this.content = "***";
    } else {
      this.content = params.content || "";
    }
    this.user = new UserModel(params.user);
  }
}

export { PostType, PostModel };
