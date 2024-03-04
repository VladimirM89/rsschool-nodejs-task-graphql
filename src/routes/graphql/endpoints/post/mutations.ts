import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
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

type DeletePostInputType = {
  id: string;
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
  type: postType as GraphQLObjectType,
  args: {
    dto: { type: new GraphQLNonNull(CreatePostInput)}
  },
  resolve: async (_: unknown, args: CreatePostInputType, { prisma }: Context) => {
    return await prisma.post.create({ data: args.dto })
  }
};

const deletePost = {
  type: UUIDType,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (_: unknown, args: DeletePostInputType, { prisma }: Context) => {
    await prisma.post.delete({ where: { id: args.id } });
    return args.id;
  }
}

export const PostMutations = {
  createPost,
  deletePost,
}