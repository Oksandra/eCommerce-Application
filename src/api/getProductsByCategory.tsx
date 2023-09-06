import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import apiRoot from '../sdk/client';

const getProductsByCategory = (
  idCategory: string
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return apiRoot
    .productProjections()
    .get({
      queryArgs: {
        where: `productType(id="${idCategory}")`,
        limit: 16,
        offset: 0,
        withTotal: true,
      },
    })
    .execute();
};

export default getProductsByCategory;
