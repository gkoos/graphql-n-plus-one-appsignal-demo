// Now import instrumented packages
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { expressErrorHandler } from "@appsignal/nodejs";
import { getContext } from "./context.js";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
});

await server.start();

const app = express();

// Add AppSignal error handler (required for error tracking)
app.use(expressErrorHandler());

// GraphQL endpoint
app.use(
  "/graphql",
  express.json(),
  expressMiddleware(server, {
    context: async () => getContext()
  })
);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}/graphql`);
});
