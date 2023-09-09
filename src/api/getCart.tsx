import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { apiRoot } from '../sdk/client';

const getCart = (id: string): Promise<ClientResponse<Cart>> => {
  return apiRoot.carts().withId({ ID: id }).get().execute();
};

export { getCart };
