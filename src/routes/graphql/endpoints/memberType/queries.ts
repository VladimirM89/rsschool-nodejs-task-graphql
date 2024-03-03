import { MemberType as PrismaMemberType } from "@prisma/client"
import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql"
import { Context } from "../../types/context.js"
import { MemberType, memberTypeIdEnum } from "./types.js"

const memberTypes = {
  type: new GraphQLList(MemberType),
  resolve: async (_: unknown, __: unknown, { prisma }: Context) => {
    return await prisma.memberType.findMany()
  }
}

const memberType = {
  type: MemberType,
  args:  {
    id: { type: new GraphQLNonNull(memberTypeIdEnum) },
  },
  resolve: async (_: unknown, { id }: PrismaMemberType, { prisma }: Context) => {
    return await prisma.memberType.findUnique({ where: { id: id } })
  }
}

export const MemberTypeQueries = {
  memberTypes,
  memberType
}