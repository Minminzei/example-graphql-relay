import { GraphQLNonNull, GraphQLID } from "graphql";
import NodeType from "@api/types/node";
import { fromGlobalId } from "graphql-relay";
import Chat from "@api/resolver/query/chat";
import User from "@api/resolver/query/user";
import { ChatModel } from "@api/types/chat";
import { UserModel } from "@api/types/user";

export default {
  type: new GraphQLNonNull(NodeType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(obj: any, args: { id: string }): Promise<ChatModel | UserModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const { type } = fromGlobalId(args.id);
        switch (type) {
          case "Chat":
            resolve(await Chat.resolve(obj, args));
            break;
          case "User":
            resolve(await User.resolve(obj, args));
            break;
          default:
            reject(new Error("Bad Request"));
        }
      } catch (e) {
        reject(e);
      }
    });
  },
};
