import { ClientResponse } from '@commercetools/platform-sdk';
import { apiRoot } from '../sdk/client';

const getCustomer = async (): Promise<ClientResponse> => {
  const id = localStorage.getItem('userWin4ik') as string;
  return apiRoot.customers().withId({ ID: id }).get().execute();
};

export default getCustomer;
