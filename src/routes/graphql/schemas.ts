import { Type } from '@fastify/type-provider-typebox';
import { PrismaClient } from '@prisma/client';
import { UUID } from 'crypto';
import { GraphQLEnumType, GraphQLSchema, buildSchema } from 'graphql';
import { Context } from './types/context.js';
import { Query } from './query.js';

const prisma = new PrismaClient();

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const MemberTypeId = new GraphQLEnumType({
  name: "MemberTypeId",
  values: {
    basic: { value: "basic" },
    business: { value: "business" }
  },
})

export const typeDefs = `
scalar UUID

enum MemberTypeId {
  basic
  business
}

type MemberType {
  id: MemberTypeId
  discount: Float
  postsLimitPerMonth: Int
  profiles: [Profile]
}

type Post {
  id: UUID!
  title: String
  content: String
  authorId: UUID
  author: User
}

type Profile {
  id: UUID!
  isMale: Boolean
  yearOfBirth: Int
  user: User
  userId: UUID
  memberType: MemberType
  memberTypeId: MemberTypeId
}

type User {
  id: UUID
  name: String
  balance: Float
  profile: Profile
  posts: [Post]
  userSubscribedTo: [User]
  subscribedToUser: [User]
}

type Query {
  memberTypes: [MemberType]
  posts: [Post]
  profiles: [Profile]
  users: [User]
  memberType(id: MemberTypeId!): MemberType
  post(id: UUID!): Post
  user(id: UUID!): User
  profile(id: UUID!): Profile
}
`

// export const resolvers = {
//     memberTypes: () => prisma.memberType.findMany(),
//     posts: () => prisma.post.findMany(),
//     profiles: () => prisma.profile.findMany(),
//     users: () => prisma.user.findMany(),
//     memberType: (args: { id: string }) => {
//       return prisma.memberType.findUnique({
//         where: { id: args.id },
//       })
//     },
//     post: async (args: { id: UUID }) => {
//       return prisma.post.findUnique({
//         where: { id: args.id },
//       })
//     },
//     user: (args: { id: UUID }) => {
//       console.log("USER ARGS", args);
//       return prisma.user.findUnique({
//         where: { id: args.id },
//       })
//     },
//     profile: (args: { id: UUID }) => {
//       return prisma.profile.findUnique({
//         where: { id: args.id },
//       })
//     },

//   User: {
//     posts: (parent: {id: UUID}, _args, context: Context) => {
//       return context.prisma1.user.findUnique({where: {id: parent.id}}).posts()
//     }
//   }
// };

// export const schema = buildSchema(typeDefs);
// console.log("!!!!!!!!!!!!!!!!SCHEMA: ", schema.getQueryType());

export const schema = new GraphQLSchema({
  query: Query,
  // mutation: mutation,
})
