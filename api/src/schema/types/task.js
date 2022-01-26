import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import User from "./user";

export const Task = new GraphQLObjectType({
  name: "Task",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
        resolve: (source) => source.created_at,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    tags: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString))
      ),
      resolve: (source) => source.tags.split(',')
    },
    approachCount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    author: {
      type: new GraphQLNonNull(User),
      resolve: (source, args, { pgApi }) => {
        return pgApi.userInfo(source.userId);
      },
    },
  },
});
