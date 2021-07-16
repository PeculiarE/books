import faker from 'faker';

export const addNewAuthorData = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const addNewAuthorInvalidData = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: addNewAuthorData.email,
  password: faker.internet.password(),
};

export const addNewAuthorRequest = `
  mutation AddNewAuthorMutation($addNewAuthorData: AuthorInput!) {
    addNewAuthor(data: $addNewAuthorData) {
      status
      message
      data {
        author {
          _id
        }
      }
    }
  }
`;
