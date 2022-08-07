import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import { encode } from "@api/convertId";
import type { User as PrismaUser } from "@prisma/client";

const UserType = new GraphQLObjectType({
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
  constructor(params: PrismaUser) {
    this.id = encode(params.id, "User");
    this.name = params.name || "";
    this.image = params.image || "";
    this.email = params.email || "";
    this.division = params.division || "";
  }
}

export { UserType, UserModel };
