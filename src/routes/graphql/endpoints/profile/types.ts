import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLNonNull } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { userType } from "../user/types.js";
import { MemberType, memberTypeIdEnum } from "../memberType/types.js";
import { Profile } from "@prisma/client";
import { Context } from "../../types/context.js";

export const profileType = new GraphQLObjectType({
  name: "ProfileType",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    user: {
      type: userType as GraphQLObjectType,
      resolve: async (_parent: Profile, _: unknown, { prisma }: Context) => {
        return await prisma.user.findUnique({ where: { id: _parent.userId } })
      }
    },
    memberType: {
      type: MemberType as GraphQLObjectType,
      resolve: async (_parent: Profile, _: unknown, { prisma }: Context) => {
        return await prisma.memberType.findUnique({ where: { id: _parent.memberTypeId } })
      }
    },
    memberTypeId: { type: memberTypeIdEnum },
  })
})