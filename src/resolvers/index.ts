import shield from "./shield";
const resolvers = {
  Query: {
    signin: shield,
    tasks: shield,
    logs: shield,
  },
  Mutation: {
    signup: shield,
    add: shield,
    update: shield,
    delete: shield,
    /*  broadcast: (_: any, args: any) => {
      // publish a random number
      pubSub.publish("show", args.num);
    }, */
  },
  Subscription: {
    show: {
      // subscribe to the randomNumber event
      subscribe: (_: any, args: any, ctx: any) => ctx.pubSub.subscribe("show"),
      resolve: (payload: any) => {
        console.log(payload);
        return payload;
      },
    },
  },
};
export default resolvers;
