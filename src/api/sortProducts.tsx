import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../sdk/client';

// В качесте type должна приходить строка asc - для сортировки от A-Z, desc - от Z-A

const sortProducts = (
  type: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 100,
        sort: [`${type}`],
      },
    })
    .execute();
};

export { sortProducts };
