import { GraphQLNonNull, GraphQLID, GraphQLInterfaceType } from "graphql";
import { ChatModel } from "@api/types/chat";

export default new GraphQLInterfaceType({
  name: "Node",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolveType: (value) => {
    if (value instanceof ChatModel) {
      return "Chat";
    }
  },
});
