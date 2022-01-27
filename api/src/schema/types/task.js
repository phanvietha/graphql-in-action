import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import Approach from "./approach";
import SearchResultItem from "./search-result-item";
import User from "./user";

export const Task = new GraphQLObjectType({
  name: "Task",
  interfaces: () => [SearchResultItem],
  fields: () => ({
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
      resolve: (source) => source.tags.split(","),
    },
    approachCount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    author: {
      type: new GraphQLNonNull(User),
      resolve: (source, args, { loaders }) => {
        return loaders.users.load(source.userId);
      },
    },
    approachList: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Approach))),
      resolve: (source, args, { loaders }) =>
        loaders.approachLists.load(source.id),
    },
  }),
});

export default Task;
