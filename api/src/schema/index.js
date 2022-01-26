import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  printSchema,
  GraphQLList,
} from "graphql";
import { Task } from "./types/task";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    taskMainList: {
      type: new GraphQLList(new GraphQLNonNull(Task)),
      resolve: (source, args, { pgApi }) => {
        return pgApi.taskMainList();
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: queryType,
});

// see schema with string
console.log(printSchema(schema));
