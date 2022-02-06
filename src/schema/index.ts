import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { createUser, deleteUser, updateUser } from './mutations/User';
import { greeting } from './querys/Greeting';
import { getAllUsers, getUser } from './querys/User';

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        greeting: greeting,
        getAllUsers: getAllUsers,
        getOneUser: getUser
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    }
});

export const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation
});
