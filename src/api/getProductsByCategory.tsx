import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import apiRoot from '../sdk/client';

const getProductsByCategory = (
  idCategory: string,
  page: number
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return apiRoot
    .productProjections()
    .get({
      queryArgs: {
        where: [`productType(id="${idCategory}")`],
        limit: 6,
        offset: page,
        withTotal: true,
      },
    })
    .execute();
};

export default getProductsByCategory;
