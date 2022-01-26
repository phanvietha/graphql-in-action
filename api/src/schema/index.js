import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  printSchema,
} from "graphql";
import { numbersInRangeObject } from "../utils";
import { NumbersInRange } from "./types";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    currentTime: {
      type: GraphQLString,
      resolve: () => {
        const isoString = new Date().toISOString();
        return isoString.slice(11, 19);
      },
    },
    // sumNumbersInRange: {
    //   type: new GraphQLNonNull(GraphQLInt),
    //   args: {
    //     begin: {
    //       type: new GraphQLNonNull(GraphQLInt),
    //     },
    //     end: {
    //       type: new GraphQLNonNull(GraphQLInt),
    //     },
    //   },
    //   resolve: (source, { begin, end }) => {
    //     console.log(source);
    //     let sum = 0;
    //     for (let i = begin; i <= end; i++) {
    //       sum += i;
    //     }
    //     return sum;
    //   },
    // },
    // Demo partial data with non null
     sumNumbersInRange: {
      type: NumbersInRange,
      args: {
        begin: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        end: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (source, { begin, end }) => {
        console.log(source);
        return numbersInRangeObject(begin, end);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: queryType,
});

// see schema with string
console.log(printSchema(schema));
