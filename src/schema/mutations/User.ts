import { GraphQLString } from 'graphql';
import { Users } from '../../Entities/Users';
import { userType } from '../typeDef/User';
import bcrypt from 'bcryptjs';

export const createUser = {
    type: userType,
    args: {
        name: { type: GraphQLString },
        userName: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(_parents: any, args: any) {

        const { name, userName, password } = args;

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUserBD = await Users.insert({
            name, userName, password: hashedPassword
        });

        return {
            ...args,
            id: createUserBD.identifiers[0].id,
            password: hashedPassword
        };
    }
}
