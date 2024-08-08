import shield from "./shield";
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
  },
};
export default resolvers;
