import { GraphQLNonNull, GraphQLList } from "graphql";
import { UserType, UserModel } from "@api/types/user";
import prisma from "@database/lib";

async function find(): Promise<UserModel[]> {
  try {
    const users = await prisma.user.findMany({});
    return users.map((user) => new UserModel(user));
  } catch (e) {
    throw e;
  }
}

const users = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
  resolve(obj: any, args: any): Promise<UserModel[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await find();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default users;
