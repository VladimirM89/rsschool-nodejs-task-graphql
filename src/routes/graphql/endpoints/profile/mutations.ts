import { GraphQLInputObjectType, GraphQLString, GraphQLFloat, GraphQLObjectType, GraphQLNonNull } from "graphql";
import { Context } from "../../types/context.js";
import { profileType } from "./types.js";
import { memberTypeId } from "../../types/memberTypeId.js";

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
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat }
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