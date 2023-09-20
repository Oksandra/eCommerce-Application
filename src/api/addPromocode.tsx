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

const addPromocode = (
  id: string,
  versionNumber: number,
  promocode: string
): Promise<ClientResponse<Cart>> => {
  const idCustomer = localStorage.getItem('userWin4ik');
  const client = idCustomer
    ? existingTokenCustomerRequest()
    : existingTokenRequest();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKeyApi,
  });
  return apiRoot
    .me()
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        version: versionNumber,
        actions: [
          {
            action: 'addDiscountCode',
            code: promocode,
          },
        ],
      },
    })
    .execute();
};

export { addPromocode };
