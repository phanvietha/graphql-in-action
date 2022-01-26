import { GraphQLObjectType, GraphQLInt, GraphQLNonNull } from "graphql";


export const NumbersInRange = new GraphQLObjectType({
    name: 'NumbersInRange',
    description: 'Cộng số theo range',
    fields: {
        sum: {
            type: new GraphQLNonNull(GraphQLInt)
            // Resolver optional here, use default resolver by properties name
        },
        count: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    }
})

