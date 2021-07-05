/* eslint-disable class-methods-use-this */
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolve = field ? field.resolve : defaultFieldResolver;
    field.resolve = async function resolver(...args) {
      const context = args[2];
      if (!context.user) {
        throw new Error(context.error.error);
      }
      return resolve.apply(this, args);
    };
  }
}

export default IsAuthenticatedDirective;
