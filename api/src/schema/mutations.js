import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import sqls from "../db/sqls";
import { randomString } from "../utils";
import UserInput from "./types/input-user";
import UserPayload from "./types/payload-user";

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    userCreate: {
      type: new GraphQLNonNull(UserPayload),
      args: {
        input: { type: new GraphQLNonNull(UserInput) },
      },
      resolve: async (source, { input }, { mutators }) => {
        return mutators.userCreate({ input });
      },
    },
  }),
});

export default MutationType;
