import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import { toGlobalId } from "graphql-relay";
import type { User } from "@prisma/client";

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    image: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    division: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

class UserModel {
  id: string;
  name: string;
  image: string;
  email: string;
  division: string;

  constructor(params: User) {
    this.id = toGlobalId("User", params.id);
    this.name = params.name || "";
    this.image = params.image || "";
    this.email = params.email || "";
    this.division = params.division || "";
  }
}

export { UserType, UserModel };
