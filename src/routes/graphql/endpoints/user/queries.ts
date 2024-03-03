import { GraphQLList, GraphQLObjectType } from "graphql";
import { userType } from "./types.js";
import { Context } from "../../types/context.js";
import { UUIDType } from "../../types/uuid.js";
import { User } from "@prisma/client";

const users = {
  type: new GraphQLList(userType),
  resolve: async (_: unknown, __: unknown, { prisma }: Context) => {
    return await prisma.user.findMany()
  }
}

const user = {
  type: userType as GraphQLObjectType,
  args:  {
    id: { type: UUIDType },
  },
  resolve: async (_: unknown, { id }: User, { prisma }: Context) => {
    return await prisma.user.findUnique({ where: { id: id } })
  }
}

export const UserQueries = {
  users,
  user
}