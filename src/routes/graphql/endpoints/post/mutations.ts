import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { postType } from "./types.js";
import { UUIDType } from "../../types/uuid.js";
import { Context } from "../../types/context.js";

type CreatePostInputType = {
  dto: {
    title: string,
    content: string,
    authorId: string,
  }
}

const CreatePostInput = new GraphQLInputObjectType({
  name: "CreatePostInput",
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType }
  }),
});

const createPost = {
  type: postType,
  args: {
    dto: { type: new GraphQLNonNull(CreatePostInput)}
  },
  resolve: async (_: unknown, args: CreatePostInputType, { prisma }: Context) => {
    return await prisma.post.create({ data: args.dto })
  }
};

export const PostMutations = {
  createPost,
}