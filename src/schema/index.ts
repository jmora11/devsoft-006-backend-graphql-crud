import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { createUser } from './mutations/User';
import { greeting } from './querys/Greeting';

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        greeting: greeting
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: createUser
    }
});

export const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation
});
