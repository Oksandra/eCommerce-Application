import {
  Cart,
  ClientResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  existingTokenCustomerRequest,
  existingTokenRequest,
  projectKeyApi,
} from '../sdk/BuildClient';

const getCart = (id: string): Promise<ClientResponse<Cart>> => {
  const client = existingTokenRequest();
  const apiRootAnonimous = createApiBuilderFromCtpClient(client).withProjectKey(
    {
      projectKey: projectKeyApi,
    }
  );
  return apiRootAnonimous.carts().withId({ ID: id }).get().execute();
};

const getCartCustomer = (): Promise<ClientResponse<Cart>> => {
  const client = existingTokenCustomerRequest();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKeyApi,
  });
  return apiRoot.me().activeCart().get().execute();
};

export { getCart, getCartCustomer };
