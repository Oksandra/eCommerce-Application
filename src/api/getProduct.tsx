import { ClientResponse, Product } from '@commercetools/platform-sdk';
import { apiRoot } from '../sdk/client';

const getProduct = (id: string): Promise<ClientResponse<Product>> => {
  return apiRoot.products().withId({ ID: id }).get().execute();
};

export default getProduct;
