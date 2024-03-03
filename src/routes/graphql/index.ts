import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, resolvers, schema } from './schemas.js';
import { graphql } from 'graphql';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const variables = req.body.variables;
      const query = req.body.query;
      // const users = await fastify.prisma.user.findMany();
      console.log("________________________________________________QUERY ", query);
      // console.log("USERS ", users);
      console.log("________________________________________________VARIABLES ", variables);
      const response = await graphql({
      schema: schema, source: query, rootValue: resolvers,  variableValues: variables, contextValue: { prisma, query } })
      console.log("__________________DATA ERROR: ", response.errors);
      return {data: response.data};
    },
  });
};

export default plugin;
