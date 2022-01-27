import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from "graphql";
import SearchResultItem from "./types/search-result-item";

import Task from "./types/task";

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    taskMainList: {
      type: new GraphQLList(new GraphQLNonNull(Task)),
      resolve: async (source, args, { loaders }) => {
        // Custom id latest to cache
        return loaders.tasksByTypes.load("latest");
      },
    },
    taskInfo: {
      type: new GraphQLNonNull(Task),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (source, args, { loaders }) => {
        return loaders.tasks.load(args.id);
      },
    },
    // search: {
    //   type: new GraphQLNonNull(
    //     new GraphQLList(new GraphQLNonNull(SearchResultItem))
    //   ),
    //   args: {
    //     term: { type: new GraphQLNonNull(GraphQLString) },
    //   },
    //   resolve: async (source, args, { loaders }) => {
    //     return loaders.searchResults.load(args.term);
    //   },
    // },
  },
});

export default QueryType;
