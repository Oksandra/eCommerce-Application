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

const deleteCartAnonimous = (
  id: string,
  versionNumber: number
): Promise<ClientResponse<Cart>> => {
  const client = existingTokenRequest();
  const apiRootAnonimous = createApiBuilderFromCtpClient(client).withProjectKey(
    {
      projectKey: projectKeyApi,
    }
  );
  return apiRootAnonimous
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

const deleteCartCustomer = (
  id: string,
  versionNumber: number
): Promise<ClientResponse<Cart>> => {
  const client = existingTokenCustomerRequest();
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

export { deleteCartAnonimous, deleteCartCustomer };
