import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../sdk/client';

const getProducts = (): Promise<
  ClientResponse<ProductProjectionPagedQueryResponse>
> => {
  return apiRoot
    .productProjections()
    .get({
      queryArgs: {
        limit: 100,
        withTotal: true,
      },
    })
    .execute();
};

export default getProducts;
