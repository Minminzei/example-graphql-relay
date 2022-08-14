import { GraphQLNonNull, GraphQLID } from "graphql";
import NodeType from "@api/types/node";

export default {
  type: new GraphQLNonNull(NodeType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
};
