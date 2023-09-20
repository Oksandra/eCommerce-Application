import {
  createApiBuilderFromCtpClient,
  ClientResponse,
  CustomerSignInResult,
  Customer,
} from '@commercetools/platform-sdk';
import {
  anonimousRequest,
  existingTokenRequest,
  passwordRequest,
  projectKeyApi,
} from '../sdk/BuildClient';

const loginCustomer = async (
  userEmail: string,
  userPassword: string
): Promise<ClientResponse<CustomerSignInResult>> => {
  const client = existingTokenRequest();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKeyApi,
  });
  return apiRoot
    .me()
    .login()
    .post({
      body: {
        email: userEmail,
        password: userPassword,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
      },
    })
    .execute();
};

const loginCustomerAnonimous = async (
  userEmail: string,
  userPassword: string
): Promise<ClientResponse<CustomerSignInResult>> => {
  const client = anonimousRequest();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKeyApi,
  });
  return apiRoot
    .me()
    .login()
    .post({
      body: {
        email: userEmail,
        password: userPassword,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
      },
    })
    .execute();
};

const getMeCustomer = async (
  userEmail: string,
  userPassword: string
): Promise<ClientResponse<Customer>> => {
  const client = passwordRequest(userEmail, userPassword);
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKeyApi,
  });
  return apiRoot.me().get().execute();
};

export { loginCustomer, getMeCustomer, loginCustomerAnonimous };
