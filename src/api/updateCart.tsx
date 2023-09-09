import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { anonimousApiRoot } from '../sdk/client';

const updateCartAnonimous = (
  id: string,
  versionNumber: number,
  idProduct: string
): Promise<ClientResponse<Cart>> => {
  return anonimousApiRoot
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

export default updateCartAnonimous;
