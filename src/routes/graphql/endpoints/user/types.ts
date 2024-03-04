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
    profile: {
      type: profileType as GraphQLObjectType,
      resolve: async (parent: User, _: unknown, { prisma }: Context) => {
        return await prisma.profile.findUnique({ where: { userId: parent.id } })
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (parent: User, _: unknown, { prisma }: Context) => {
        return await prisma.post.findMany({ where: { authorId: parent.id } })
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async (parent: User, _: unknown, { prisma }: Context) => {
        const authors = await prisma.subscribersOnAuthors.findMany({where: {subscriberId: parent.id}, select: { author: true }});

        return authors.map((item) => item.author);
      }
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async (parent: User, _: unknown, { prisma }: Context) => {
        const sub = await prisma.subscribersOnAuthors.findMany({where: {authorId: parent.id}, select: { subscriber: true }});
        return sub.map((item) => item.subscriber);
      }},
  })
})