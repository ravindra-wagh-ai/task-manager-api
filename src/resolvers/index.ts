import signup from "./signup";
import signin from "./signin";
import add from "./add";
import update from "./update";
import deleteTask from "./delete";
const resolvers = {
  Query: {
    signin: signin,
  },
  Mutation: {
    signup: signup,
    add: add,
    update: update,
    delete: deleteTask,
  },
};
export default resolvers;
