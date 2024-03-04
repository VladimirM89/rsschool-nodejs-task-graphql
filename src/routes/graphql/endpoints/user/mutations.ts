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

type ChangeUserInputType = {
  id: string;
  dto: {
    name: string;
    balance: number;
  }
}

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

const ChangeUserInput = new GraphQLInputObjectType({
  name: "ChangeUserInput",
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat }
  })
})

const changeUser = {
  type: userType as GraphQLObjectType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeUserInput) }
  },
  resolve: async (_: unknown, args: ChangeUserInputType, { prisma }: Context) => {
    return await prisma.user.update({ where: { id: args.id }, data: args.dto });
  }
}

export const UserMutations = {
  createUser,
  deleteUser,
  changeUser,
}
