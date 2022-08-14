import { GraphQLNonNull, GraphQLID } from "graphql";
import prisma from "@database/lib";
import fromGlobalId from "@api/fromGlobalId";
import { UserModel, UserType } from "@api/types/user";

async function get(userId: string): Promise<UserModel> {
  try {
    const id = fromGlobalId(userId);
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user || user.deletedAt) {
      throw new Error("Not Found");
    }
    return new UserModel(user);
  } catch (e) {
    throw e;
  }
}

export default {
  type: new GraphQLNonNull(UserType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(ogj: undefined, args: { id: string }): Promise<UserModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await get(args.id);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  },
};
