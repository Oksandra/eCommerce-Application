import { ClientResponse } from '@commercetools/platform-sdk';
import { apiRoot } from '../sdk/client';

const getCustomerCart = async (): Promise<ClientResponse> => {
  const id = localStorage.getItem('userWin4ik') as string;
  return apiRoot.carts().withCustomerId({ customerId: id }).get().execute();
};

export default getCustomerCart;
