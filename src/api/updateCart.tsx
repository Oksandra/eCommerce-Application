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

const updateCartAnonimous = (
  id: string,
  versionNumber: number,
  idProduct: string
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
            action: 'addLineItem',
            productId: idProduct,
            quantity: 1,
          },
        ],
      },
    })
    .execute();
};

const updateCart = (
  id: string,
  versionNumber: number,
  idProduct: string
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
            action: 'addLineItem',
            productId: idProduct,
            quantity: 1,
          },
        ],
      },
    })
    .execute();
};

export { updateCartAnonimous, updateCart };
