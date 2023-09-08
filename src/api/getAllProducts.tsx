import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import apiRoot from '../sdk/client';

const getAllProducts = (
  page: number
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return apiRoot
    .productProjections()
    .get({
      queryArgs: {
        limit: 100,
        offset: page,
        withTotal: true,
      },
    })
    .execute();
};

export default getAllProducts;
