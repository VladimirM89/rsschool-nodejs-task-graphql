import { GraphQLObjectType } from "graphql";
import { UserMutations } from "./endpoints/user/mutations.js";
import { PostMutations } from "./endpoints/post/mutations.js";
import { ProfileMutations } from "./endpoints/profile/mutations.js";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "MutationType",
  fields: () => ({
    ...UserMutations,
    ...PostMutations,
    ...ProfileMutations,
  })
})