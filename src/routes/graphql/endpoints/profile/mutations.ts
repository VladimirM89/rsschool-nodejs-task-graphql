import { GraphQLInputObjectType, GraphQLObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLInt } from "graphql";
import { Context } from "../../types/context.js";
import { profileType } from "./types.js";
import { memberTypeId } from "../../types/memberTypeId.js";
import { UUIDType } from "../../types/uuid.js";
import { memberTypeIdEnum } from "../memberType/types.js";

type CreateProfileInputType = {
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: memberTypeId;
  }
};

const CreateProfileInput = new GraphQLInputObjectType({
  name: "CreateProfileInput",
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: memberTypeIdEnum },
  })
})

const createProfile = {
  type: profileType as GraphQLObjectType,
  args: {
    dto: { type: new GraphQLNonNull(CreateProfileInput)}
  },
  resolve: async (_: unknown, args: CreateProfileInputType, { prisma }: Context) => {
    return await prisma.profile.create({ data: args.dto })
  }
}

export const ProfileMutations = {
  createProfile,
}