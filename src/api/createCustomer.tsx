import {
  CustomerSignInResult,
  ClientResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  anonimousRequest,
  existingTokenRequest,
  projectKeyApi,
} from '../sdk/BuildClient';
import { Customer } from '../interfaces/interfaces';

const createCustomer = async (
  customer: Customer
): Promise<ClientResponse<CustomerSignInResult>> => {
  const client = existingTokenRequest();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKeyApi,
  });
  return apiRoot
    .customers()
    .post({
      body: customer,
    })
    .execute();
};

const createCustomerAnonimous = async (
  customer: Customer
): Promise<ClientResponse<CustomerSignInResult>> => {
  const client = anonimousRequest();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKeyApi,
  });
  return apiRoot
    .customers()
    .post({
      body: customer,
    })
    .execute();
};

export { createCustomer, createCustomerAnonimous };
