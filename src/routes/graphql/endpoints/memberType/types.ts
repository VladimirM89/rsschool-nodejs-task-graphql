import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { profileType } from "../profile/types.js";
import { memberTypeId } from "../../types/memberTypeId.js";
import { MemberTypeId } from "../../../member-types/schemas.js";
import { Context } from "../../types/context.js";
import { MemberType as PrismaMemberType } from "@prisma/client";

export const memberTypeIdEnum = new GraphQLEnumType({
  name: "MemberTypeId",
  values: {
    basic: { value: memberTypeId.BASIC },
    business: { value: MemberTypeId.BUSINESS }
  },
})

export const MemberType = new GraphQLObjectType({
  name: "MemberType",
  fields: () => ({
    id: { type: memberTypeIdEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(profileType),
      resolve: async (_parent: PrismaMemberType, _: unknown, { prisma }: Context) => {
        return await prisma.profile.findMany({ where: { memberTypeId: _parent.id } })
      }
    },
  })
})