import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { userType } from "../user/types.js";
import { Post } from "@prisma/client";
import { Context } from "../../types/context.js";

export const postType = new GraphQLObjectType({
  name: "PostType",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: GraphQLString },
    content: { type: GraphQLFloat },
    authorId: { type: UUIDType },
    author: {
      type: userType as GraphQLObjectType,
      resolve: async (_parent: Post, _: unknown, { prisma }: Context) => {
        return await prisma.user.findUnique({ where: { id: _parent.authorId }})
      }
     },
  })
})