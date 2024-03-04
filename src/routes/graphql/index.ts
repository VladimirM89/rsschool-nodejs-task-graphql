import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { GraphQLError, graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

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

        const errors = validate(schema, parse(query), [depthLimit(5)])
        if (errors.length) {
          return {errors};
        }

        const response = await graphql({
        schema: schema, source: query,  variableValues: variables, contextValue: { prisma } })
        return {data: response.data, errors: response.errors};
    },
  });
};

export default plugin;
