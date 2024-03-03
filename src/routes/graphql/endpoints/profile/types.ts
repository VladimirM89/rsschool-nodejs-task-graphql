import { GraphQLObjectType, GraphQLBoolean, GraphQLInt } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { userType } from "../user/types.js";
import { memberType, memberTypeIdEnum } from "../memberType/types.js";
import {  Profile } from "@prisma/client";
import { Context } from "../../types/context.js";

export const profileType = new GraphQLObjectType({
  name: "ProfileType",
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    user: {
      type: userType as GraphQLObjectType,
      resolve: async (_parent: Profile, _: unknown, { prisma }: Context) => {
        return await prisma.user.findUnique({ where: { id: _parent.userId } })
      }
    },
    userId: { type: UUIDType },
    memberType: {
      type: memberType,
      resolve: async (_parent: Profile, _: unknown, { prisma }: Context) => {
        await prisma.memberType.findUnique({ where: { id: _parent.memberTypeId } })
      }
    },
    memberTypeId: { type: memberTypeIdEnum },
  })
})