import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { profileType } from "../profile/types.js";
import { memberTypeId } from "../../types/memberTypeId.js";
import { MemberTypeId } from "../../../member-types/schemas.js";
import { Context } from "../../types/context.js";
import { MemberType } from "@prisma/client";

export const memberTypeIdEnum = new GraphQLEnumType({
  name: "MemberTypeIdEnum",
  values: {
    basic: { value: memberTypeId.BASIC },
    business: { value: MemberTypeId.BUSINESS }
  },
})

export const memberType = new GraphQLObjectType({
  name: "MemberType",
  fields: () => ({
    id: { type: new GraphQLNonNull(memberTypeIdEnum)},
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(profileType),
      resolve: async (_parent: MemberType, _: unknown, { prisma }: Context) => {
        return await prisma.profile.findMany({ where: { memberTypeId: _parent.id } })
      }
    },
  })
})