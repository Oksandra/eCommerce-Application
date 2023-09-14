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

const changeCountProduct = (
  id: string,
  versionNumber: number,
  idLine: string,
  count: number
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
            action: 'changeLineItemQuantity',
            lineItemId: `${idLine}`,
            quantity: count,
          },
        ],
      },
    })
    .execute();
};

export { changeCountProduct };
