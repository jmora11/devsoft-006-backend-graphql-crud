import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        userName: { type: GraphQLString },
        password: { type: GraphQLString },
    }
});
