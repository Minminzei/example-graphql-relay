import { GraphQLNonNull } from "graphql";
import prisma from "@database/lib";
import guestId from "@api/guestId";
import { UserModel, UserType } from "@api/types/user";

async function get(id: number): Promise<UserModel> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: { chats: true },
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
  resolve(): Promise<UserModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await get(guestId);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  },
};
