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

const deleteCart = (
  id: string,
  versionNumber: number
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
    .delete({
      queryArgs: {
        version: versionNumber,
      },
    })
    .execute();
};

export { deleteCart };
