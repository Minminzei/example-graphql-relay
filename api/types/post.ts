import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import {
  connectionDefinitions,
  toGlobalId,
  offsetToCursor,
} from "graphql-relay";
import type { Post, User } from "@prisma/client";
import { UserType, UserModel } from "@api/types/user";

const PostType: GraphQLObjectType = new GraphQLObjectType({
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

const { connectionType: PostConnection, edgeType: PostEdgeType } =
  connectionDefinitions({
    name: "PostConnection",
    nodeType: new GraphQLNonNull(PostType),
  });

class PostModel {
  id: string;
  content: string;
  deletedAt: Date | null;
  user: UserModel;
  constructor(
    params: Post & {
      user: User;
    }
  ) {
    this.id = toGlobalId("Post", params.id);
    if (params.deletedAt) {
      this.content = "***";
    } else {
      this.content = params.content || "";
    }
    this.deletedAt = params.deletedAt;
    this.user = new UserModel(params.user);
  }
}

class PostEdgeModel {
  cursor: string;
  node: PostModel;
  constructor(params: { cursor: number; node: PostModel }) {
    this.cursor = offsetToCursor(params.cursor);
    this.node = params.node;
  }
}

export { PostType, PostConnection, PostEdgeType, PostModel, PostEdgeModel };
