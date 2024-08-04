import signup from "./signup";
import signin from "./signin";
const resolvers = {
  Query: {
    signin: signin,
  },
  Mutation: {
    signup: signup,
  },
};
export default resolvers;
