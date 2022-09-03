import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLUnionType,
} from "graphql";
import { UserModel, UserType } from "@api/types/user";
import prisma from "@database/lib";
import ErrorType from "@api/types/error";
import guestId from "@api/guestId";

interface ProfileInput {
  name: string;
  image: string;
  email: string;
  division: string;
}

type Result = UserModel | ErrorType;

async function update(data: ProfileInput): Promise<Result> {
  try {
    const user = await prisma.user.update({
      where: {
        id: guestId,
      },
      data: {
        name: data.name,
        image: data.image,
        email: data.email,
        division: data.division,
      },
    });
    return new UserModel(user);
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
}

const profileInput = new GraphQLInputObjectType({
  name: "ProfileInput",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    division: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ProfileUpdatedResultType = new GraphQLUnionType({
  name: "ProfileUpdatedResult",
  types: [
    UserType,
    new GraphQLObjectType({
      name: "ProfileUpdatedError",
      fields: {
        message: { type: new GraphQLNonNull(GraphQLString) },
      },
    }),
  ],
  resolveType: (value) => {
    if (value instanceof UserModel) {
      return "User";
    }
    return "ProfileUpdatedError";
  },
});

export default {
  type: new GraphQLNonNull(ProfileUpdatedResultType),
  args: {
    input: { type: new GraphQLNonNull(profileInput) },
  },
  resolve(obj: undefined, { input }: { input: ProfileInput }): Promise<Result> {
    return new Promise(async (resolve) => {
      const result = await update(input);
      resolve(result);
    });
  },
};
