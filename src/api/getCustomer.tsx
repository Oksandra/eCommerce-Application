import {
  createApiBuilderFromCtpClient,
  ClientResponse,
} from '@commercetools/platform-sdk';
import { loginRequest, projectKeyApi } from '../sdk/BuildClient';

const getCustomer = async (
  userEmail: string,
  userPassword: string
): Promise<ClientResponse> => {
  const client = loginRequest(userEmail, userPassword);
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKeyApi,
  });
  return apiRoot.me().get().execute();
};

export default getCustomer;
