import { GraphQLNonNull, GraphQLID, GraphQLInterfaceType } from "graphql";

export default new GraphQLInterfaceType({
  name: "Node",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
});
