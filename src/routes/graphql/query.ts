import { GraphQLObjectType } from "graphql";

export const Query = new GraphQLObjectType({
  name: "Query",
  description: "QueryType",
  fields: () => ({
  ...UserQueries,
  })
})