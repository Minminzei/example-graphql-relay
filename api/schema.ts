import { GraphQLSchema } from "graphql";
import * as _ from "lodash";
import { query, mutation } from "@api/resolver";

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;
