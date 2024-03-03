import { GraphQLObjectType } from "graphql";
import { UserQueries } from "./endpoints/user/queries.js";
import { ProfileQueries } from "./endpoints/profile/queries.js";
import { PostQueries } from "./endpoints/post/queries.js";
import { MemberTypeQueries } from "./endpoints/memberType/queries.js";

export const Query = new GraphQLObjectType({
  name: "Query",
  description: "QueryType",
  fields: () => ({
  ...UserQueries,
  ...ProfileQueries,
  ...PostQueries,
  ...MemberTypeQueries,
  })
})