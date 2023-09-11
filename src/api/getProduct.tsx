import {
  ClientResponse,
  Product,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  existingTokenCustomerRequest,
  projectKeyApi,
} from '../sdk/BuildClient';

const getProduct = (id: string): Promise<ClientResponse<Product>> => {
  const client = existingTokenCustomerRequest();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKeyApi,
  });
  return apiRoot.products().withId({ ID: id }).get().execute();
};

export default getProduct;
