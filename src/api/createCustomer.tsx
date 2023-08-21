import {
  CustomerSignInResult,
  ClientResponse,
} from '@commercetools/platform-sdk';
import apiRoot from '../sdk/client';
import { Customer } from '../interfaces/interfaces';

const createCustomer = async (
  customer: Customer
): Promise<ClientResponse<CustomerSignInResult>> => {
  return apiRoot
    .customers()
    .post({
      body: customer,
    })
    .execute();
};

export default createCustomer;
