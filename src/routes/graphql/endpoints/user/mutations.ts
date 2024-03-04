import { GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Context } from "../../types/context.js";
import { userType } from "./types.js";
import { UUIDType } from "../../types/uuid.js";

type CreateUserInputType = {
  dto: {
    name: string;
    balance: number;
  }
};

type DeleteUserInputType = {
  id: string;
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

const deleteUser = {
  type: UUIDType,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (_: unknown, args: DeleteUserInputType, { prisma }: Context) => {
    await prisma.user.delete({ where: { id: args.id } });
    return args.id;
  }
}

export const UserMutations = {
  createUser,
  deleteUser,
}
