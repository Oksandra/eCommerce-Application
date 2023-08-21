import {
  createApiBuilderFromCtpClient,
  ClientResponse,
} from '@commercetools/platform-sdk';
import { loginRequest, projectKeyApi } from '../sdk/BuildClient';

const loginCustomer = async (
  userEmail: string,
  userPassword: string
): Promise<ClientResponse> => {
  const client = loginRequest(userEmail, userPassword);
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
        updateProductData: true,
      },
    })
    .execute();
};

export default loginCustomer;
