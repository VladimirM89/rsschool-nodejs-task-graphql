import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { postType } from "../post/types.js";
import { profileType } from "../profile/types.js";
import { Context } from "../../types/context.js";
import { User } from "@prisma/client";

export const userType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: { type: profileType as GraphQLObjectType },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (parent: User, _: unknown, { prisma }: Context) => {
        return await prisma.post.findMany({ where: { authorId: parent.id } })
      }
    },
    userSubscribedTo: { type: new GraphQLList(userType) },
    subscribedToUser: { type: new GraphQLList(userType) },
  })
})