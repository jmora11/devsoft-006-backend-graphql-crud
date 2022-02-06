import { GraphQLID, GraphQLList } from "graphql";
import { Users } from "../../Entities/Users";
import { userType } from "../typeDef/User";

export const getAllUsers = {
    type: new GraphQLList(userType),
    async resolve() {
        return await Users.find();
    }
};

export const getUser = {
    type: userType,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_: any, args: any) {
        return await Users.findOne(args.id);
    }
}
