import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  printSchema,
  GraphQLList,
} from "graphql";
import { numbersInRangeObject } from "../utils";
import { NumbersInRange } from "./types";
import { Task } from "./types/task";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    taskMainList: {
      type: new GraphQLList(new GraphQLNonNull(Task)),
      resolve: async (source, args, { pgPool }) => {
        const pgResp = await pgPool.query(`
          SELECT *
          FROM azdev.tasks
          WHERE is_private = FALSE
          ORDER BY created_at DESC
          LIMIT 100
        `);
        return pgResp.rows;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: queryType,
});

// see schema with string
console.log(printSchema(schema));
