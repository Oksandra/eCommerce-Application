import {
  ClientResponse,
  ProductPagedQueryResponse,
} from '@commercetools/platform-sdk';
import apiRoot from '../sdk/client';

const getAllProducts = (
  page: number
): Promise<ClientResponse<ProductPagedQueryResponse>> => {
  return apiRoot
    .products()
    .get({
      queryArgs: {
        limit: 6,
        offset: page,
        withTotal: true,
      },
    })
    .execute();
};

export default getAllProducts;
