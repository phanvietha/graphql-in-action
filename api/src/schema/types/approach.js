import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";

import User from "./user";
import SearchResultItem from "./search-result-item";
import Task from "./task";
import ApproachDetail from "./approach-detail";

const Approach = new GraphQLObjectType({
  name: "Approach",
  // Use function to resolve bcs circular depend
  interfaces: () => [SearchResultItem],
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    voteCount: { type: new GraphQLNonNull(GraphQLInt) },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ createdAt }) => createdAt.toISOString(),
    },
    author: {
      type: new GraphQLNonNull(User),
      resolve: (source, args, { loaders }) => loaders.users.load(source.userId),
    },
    task: {
      type: new GraphQLNonNull(Task),
      resolve: (source, args, { loaders }) => loaders.tasks.load(source.taskId),
    },
    detailList: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(ApproachDetail))
      ),
      resolve: (source, args, { loaders }) =>
        loaders.detailLists.load(source.id),
    },
  }),
});

export default Approach;
