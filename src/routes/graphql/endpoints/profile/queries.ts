import { User } from "@prisma/client"
import { GraphQLList, GraphQLObjectType } from "graphql"
import { Context } from "../../types/context.js"
import { UUIDType } from "../../types/uuid.js"
import { profileType } from "./types.js"

const profiles = {
  type: new GraphQLList(profileType),
  resolve: async (_: unknown, __: unknown, { prisma }: Context) => {
    return await prisma.profile.findMany()
  }
}

const profile = {
  type: profileType as GraphQLObjectType,
  args:  {
    id: { type: UUIDType },
  },
  resolve: async (_: unknown, { id }: User, { prisma }: Context) => {
    return await prisma.profile.findUnique({ where: { id: id } })
  }
}

export const ProfileQueries = {
  profiles,
  profile
}