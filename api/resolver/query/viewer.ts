import { GraphQLNonNull } from "graphql";
import { UserType, UserModel } from "@api/types/user";
import prisma from "@database/lib";
import guestId from "@api/guestId";

async function get(): Promise<UserModel> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: guestId,
      },
      include: { chats: true },
    });
    if (!user) {
      throw new Error("Not Found");
    }
    return new UserModel(user);
  } catch (e) {
    throw e;
  }
}

const viewer = {
  type: new GraphQLNonNull(UserType),
  resolve(): Promise<UserModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await get();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default viewer;
