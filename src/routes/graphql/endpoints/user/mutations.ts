import { GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Context } from "../../types/context.js";
import { userType } from "./types.js";

type CreateUserInputType = {
  dto: {
    name: string;
    balance: number;
  }
};

const CreateUserInput = new GraphQLInputObjectType({
  name: "CreateUserInput",
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat }
  })
})

const createUser = {
  type: userType as GraphQLObjectType,
  args: {
    dto: { type: new GraphQLNonNull(CreateUserInput)}
  },
  resolve: async (_: unknown, args: CreateUserInputType, { prisma }: Context) => {
    return await prisma.user.create({ data: args.dto })
  }
}

export const UserMutations = {
  createUser,
}
