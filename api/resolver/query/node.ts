import { GraphQLNonNull, GraphQLID } from "graphql";
import NodeType from "@api/types/node";
import { fromGlobalId } from "graphql-relay";
import Chat from "./chat";

export default {
  type: new GraphQLNonNull(NodeType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(obj: any, args: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { type } = fromGlobalId(args.id);
        if (type === "Chat") {
          const result = await Chat.resolve(obj, args);
          resolve(result);
        } else {
          reject(new Error("Bad Request"));
        }
      } catch (e) {
        reject(e);
      }
    });
  },
};
