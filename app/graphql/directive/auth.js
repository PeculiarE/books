/* eslint-disable class-methods-use-this */
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { helpers, constants } from '../../utils';

const { ResponseHelpers: { moduleErrLogMessager } } = helpers;
const { httpStatusCodes: { UNAUTHORIZED }, apiMessages: { AUTH_ERROR } } = constants;

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolve = field ? field.resolve : defaultFieldResolver;
    field.resolve = async function resolver(...args) {
      const { req } = args[2];
      if (!req.user) {
        moduleErrLogMessager(UNAUTHORIZED, AUTH_ERROR, req.error.error);
        throw new Error('AUTH');
      }
      return resolve.apply(this, args);
    };
  }
}

export default IsAuthenticatedDirective;
