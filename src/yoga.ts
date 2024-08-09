import { createYoga, createSchema, maskError } from "graphql-yoga";
import { createEnvelopQueryValidationPlugin } from "graphql-constraint-directive";
import { GraphQLError } from "graphql";
import typeDefs from "./types/index";
import resolvers from "./resolvers/index";
import { createPubSub } from "graphql-yoga";
const pubSub = createPubSub();
//import handler from "./handler";
export default createYoga({
    schema: createSchema({
      typeDefs: typeDefs,
      resolvers: resolvers,
    }),
    plugins: [createEnvelopQueryValidationPlugin()],
    graphqlEndpoint: "/taskapi",
    maskedErrors: {
      maskError(e) {
        let gqle = e as GraphQLError;
        return maskError(gqle.extensions.originalError, gqle.message, true);
      },
    },
    context: { pubSub: pubSub }
  });