import { User } from "@prisma/client"
import { GraphQLList, GraphQLObjectType } from "graphql"
import { Context } from "../../types/context.js"
import { UUIDType } from "../../types/uuid.js"
import { postType } from "./types.js"

const posts = {
  type: new GraphQLList(postType),
  resolve: async (_: unknown, __: unknown, { prisma }: Context) => {
    return await prisma.post.findMany()
  }
}

const post = {
  type: postType as GraphQLObjectType,
  args:  {
    id: { type: UUIDType },
  },
  resolve: async (_: unknown, { id }: User, { prisma }: Context) => {
    return await prisma.post.findUnique({ where: { id: id } })
  }
}

export const PostQueries = {
  posts,
  post
}