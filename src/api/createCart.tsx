import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { anonimousApiRoot, apiRoot } from '../sdk/client';

const createCartAnonimous = (): Promise<ClientResponse<Cart>> => {
  return anonimousApiRoot
    .carts()
    .post({
      body: {
        currency: 'USD',
      },
    })
    .execute();
};

const createCartCustomer = (id?: string): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .post({
      body: {
        customerId: id,
        currency: 'USD',
      },
    })
    .execute();
};

export { createCartAnonimous, createCartCustomer };
