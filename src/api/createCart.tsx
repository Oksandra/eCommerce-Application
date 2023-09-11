import {
  Cart,
  ClientResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  anonimousRequest,
  existingTokenCustomerRequest,
  projectKeyApi,
} from '../sdk/BuildClient';

const createCartAnonimous = (): Promise<ClientResponse<Cart>> => {
  const client = anonimousRequest();
  const apiRootAnonimous = createApiBuilderFromCtpClient(client).withProjectKey(
    {
      projectKey: projectKeyApi,
    }
  );
  return apiRootAnonimous
    .me()
    .carts()
    .post({
      body: {
        currency: 'USD',
      },
    })
    .execute();
};

const createCartCustomer = (): Promise<ClientResponse<Cart>> => {
  const client = existingTokenCustomerRequest();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKeyApi,
  });
  return apiRoot
    .me()
    .carts()
    .post({
      body: {
        currency: 'USD',
      },
    })
    .execute();
};

export { createCartAnonimous, createCartCustomer };
