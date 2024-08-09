import shield from "./shield";
import { createPubSub } from "graphql-yoga";
const pubSub = createPubSub();

const resolvers = {
  Query: {
    signin: shield,
    tasks: shield,
  },
  Mutation: {
    signup: shield,
    add: shield,
    update: shield,
    delete: shield,
    broadcast: (_: any, args: any) => {
      // publish a random number
      pubSub.publish("show", args.num);
    },
  },
  Subscription: {
    show: {
      // subscribe to the randomNumber event
      subscribe: () => pubSub.subscribe("show"),
      resolve: (payload: any) =>{console.log(payload); return payload},
    },
  },
};
export default resolvers;
