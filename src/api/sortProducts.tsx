import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import apiRoot from '../sdk/client';

// В качесте type должна приходить строка asc - для сортировки от A-Z, desc - от Z-A

const sortProducts = (
  type: string,
  page: number
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 6,
        offset: page,
        sort: [`${type}`],
      },
    })
    .execute();
};

export { sortProducts };
