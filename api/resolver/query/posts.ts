import { GraphQLNonNull, GraphQLList } from "graphql";
import { PostType, PostModel } from "@api/types/post";
import prisma from "@database/lib";

async function find(): Promise<PostModel[]> {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true },
    });
    return posts.map((post) => new PostModel(post));
  } catch (e) {
    throw e;
  }
}

const posts = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
  resolve(obj: any, args: any): Promise<PostModel[]> {
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

export default posts;
