import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString } from 'graphql';
import { Users } from '../../Entities/Users';
import { userType } from '../typeDef/User';
import bcrypt from 'bcryptjs';
import { MessageType } from '../typeDef/Message';
import { ResponseMessageDTO } from '../../Models/ResponseMessageDTO';

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

export const deleteUser = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(_: any, { id }: any) {
        const result = await Users.delete(id);
        return result.affected;
    }
};

export const updateUser = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
        dataInput: {
            type: new GraphQLInputObjectType({
                name: 'updateUserInput',
                fields: {
                    name: { type: GraphQLString },
                    userName: { type: GraphQLString },
                    oldPassword: { type: GraphQLString },
                    newPassword: { type: GraphQLString }
                }
            })
        }
    },
    async resolve(_: any, { id, dataInput }: any) {

        const findUser = await Users.findOne(id);
        if(!findUser) return validateReponseUpdateMethod['User not found'];

        const isMatchPasswors = await bcrypt.compare(dataInput.oldPassword, findUser.password);
        if(!isMatchPasswors) return validateReponseUpdateMethod['Error password'];

        const newPasswordToSave = await bcrypt.hash(dataInput.newPassword, 10);

        const responseUpdateUser = await Users.update(
            { id }, { userName: dataInput.userName, name: dataInput.name, password: newPasswordToSave });
        if(responseUpdateUser.affected === 0) return validateReponseUpdateMethod['Error update'];

        return validateReponseUpdateMethod['Ok'];
    }
};

const validateReponseUpdateMethod: { [key: string] : ResponseMessageDTO } = {
    'User not found':  {
        success: false,
        message: 'User not found'
    },
    'Error password': {
        success: false,
        message: 'Old password and actually password doesn\'t match'
    },
    'Error update': {
        success: false,
        message: 'User can\'t updated'
    },
    'Ok': {
        success: true,
        message: 'User updated successfully'
    }
};
