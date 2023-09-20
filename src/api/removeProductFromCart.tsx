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

const removeProductFromCartAnonimous = (
  id: string,
  versionNumber: number,
  idLine: string
): Promise<ClientResponse<Cart>> => {
  const client = existingTokenRequest();
  const apiRootAnonimous = createApiBuilderFromCtpClient(client).withProjectKey(
    {
      projectKey: projectKeyApi,
    }
  );
  return apiRootAnonimous
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        version: versionNumber,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: `${idLine}`,
            quantity: 0,
          },
        ],
      },
    })
    .execute();
};

const removeProductFromCart = (
  id: string,
  versionNumber: number,
  lineItemId: string
): Promise<ClientResponse<Cart>> => {
  const client = existingTokenCustomerRequest();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKeyApi,
  });
  return apiRoot
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        version: versionNumber,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: `${lineItemId}`,
            quantity: 0,
          },
        ],
      },
    })
    .execute();
};

export { removeProductFromCart, removeProductFromCartAnonimous };
