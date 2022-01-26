import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import { Task } from "./task";

const User = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: source => `${source.firstName} ${source.lastName}`
    }
  },
});

export default User;
