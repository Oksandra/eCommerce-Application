import {
  ClientResponse,
  ProductTypePagedQueryResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../sdk/client';

const getTypesProducts = (): Promise<
  ClientResponse<ProductTypePagedQueryResponse>
> => {
  return apiRoot
    .productTypes()
    .get({
      queryArgs: {
        limit: 10,
        offset: 1,
        withTotal: true,
      },
    })
    .execute();
};

export default getTypesProducts;
