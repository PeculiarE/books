/* eslint-disable no-unused-vars */
import { expect } from 'chai';
import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import app from '../..';
import { typeDefs, resolvers } from '../../app/graphql';
import authorResolvers from '../../app/graphql/resolver/author';
import { addNewAuthorData, addNewAuthorInvalidData, addNewAuthorRequest } from '../fixtures/author';
import { constants } from '../../app/utils';
import { Author, Book } from '../../app/models';

const {
  apiMessages: {
    SIGN_UP_SUCCESS, DUPLICATED_ENTITY,
  },
  httpStatusCodes: {
    CREATED, CONFLICT,
  },
} = constants;

const runRequest = (request, variables = {}, ctx = {}) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  return graphql(schema, request, null, ctx, variables);
};

describe('Author', () => {
  before(async () => {
    await Promise.all([Author.deleteMany({}), Book.deleteMany({})]);
  });
  describe('Testing author resolvers', () => {
    after(async () => {
      await Author.deleteMany({});
    });
    it('Should resolve addNewAuthor correctly', async () => {
      const result = await authorResolvers.Mutation.addNewAuthor(
        null,
        { data: addNewAuthorData },
      );
      expect(result.status).to.equal(CREATED);
      expect(result.message).to.equal(SIGN_UP_SUCCESS);
    });
    it('Should fail to resolve addNewAuthor correctly', async () => {
      const result = await authorResolvers.Mutation.addNewAuthor(
        null,
        { data: addNewAuthorInvalidData },
      );
      expect(result.status).to.equal(CONFLICT);
      expect(result.message).to.equal(DUPLICATED_ENTITY('Email'));
    });
  });
  describe('Testing author queries and mutations', () => {
    it('Should run addNewAuthorMutation correctly', async () => {
      const { data, errors } = await runRequest(addNewAuthorRequest, { addNewAuthorData });
      expect(errors).to.equal(undefined);
      expect(data.addNewAuthor.status).to.equal(CREATED);
      expect(data.addNewAuthor.message).to.equal(SIGN_UP_SUCCESS);
    });
    it('Should fail to run addNewAuthorMutation correctly', async () => {
      const { data, errors } = await runRequest(addNewAuthorRequest, { addNewAuthorData });
      expect(errors).to.equal(undefined);
      expect(data.addNewAuthor.status).to.equal(CONFLICT);
      expect(data.addNewAuthor.message).to.equal(DUPLICATED_ENTITY('Email'));
    });
  });
});
