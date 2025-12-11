import express from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { context } from "./context.js";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

// AppSignal setup
import { Appsignal } from "@appsignal/nodejs";
import { expressMiddleware as appsignalMiddleware } from "@appsignal/express";

const appsignal = new Appsignal({
  active: true,
  name: "graphql-n-plus-one-demo",
  apiKey: process.env.APPSIGNAL_PUSH_API_KEY || "dummy_key"
});

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
  context: async () => context
});

console.log(`Server ready at ${url}`);
