import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import http from "http";
import { GraphQLSchema } from "graphql";

export async function startApolloServer(schema: GraphQLSchema) {
  // Required logic for integrating with Express
  const app = express();
  app.use(express.json({ limit: "10mb" }));

  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: `/${process.env.GRAPHQL_PATH}`,
  });

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.API_PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.API_PORT}${server.graphqlPath}`
  );
}
