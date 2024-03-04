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

type DeleteProfileInputType = {
  id: string;
};

type ChangeProfileInputType = {
  id: string;
  dto: {
    isMale: boolean;
    yearOfBirth: number;
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
});

const createProfile = {
  type: profileType as GraphQLObjectType,
  args: {
    dto: { type: new GraphQLNonNull(CreateProfileInput)}
  },
  resolve: async (_: unknown, args: CreateProfileInputType, { prisma }: Context) => {
    return await prisma.profile.create({ data: args.dto })
  }
};

const deleteProfile = {
  type: UUIDType,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (_: unknown, args: DeleteProfileInputType, { prisma }: Context) => {
    await prisma.profile.delete({ where: { id: args.id } });
    return args.id;
  }
};

const ChangeProfileInput = new GraphQLInputObjectType({
  name: "ChangeProfileInput",
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: memberTypeIdEnum },
  }),
});

const changeProfile = {
  type: profileType as GraphQLObjectType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeProfileInput)}
  },
  resolve: async (_: unknown, args: ChangeProfileInputType, { prisma }: Context) => {
    return await prisma.profile.update({ where: {id: args.id}, data: args.dto });
  }
};

export const ProfileMutations = {
  createProfile,
  deleteProfile,
  changeProfile,
}