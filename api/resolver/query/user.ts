import { GraphQLNonNull, GraphQLID } from "graphql";
import { decode } from "@api/convertId";
import { UserType, UserModel } from "@api/types/user";
import prisma from "@database/lib";

async function get(id: string): Promise<UserModel> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: decode(id),
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

const user = {
  type: new GraphQLNonNull(UserType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(obj: any, args: any): Promise<UserModel> {
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

export default user;
