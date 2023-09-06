import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import apiRoot from '../sdk/client';

// В качесте type должна приходить строка asc - для сортировки от A-Z, desc - от Z-A

const sortProductsByName = (
  type: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 100,
        sort: [`name.en-us ${type}`],
      },
    })
    .execute();
};

const sortProductsByPrice = (
  type: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 100,
        sort: [`price ${type}`],
      },
    })
    .execute();
};

export { sortProductsByName, sortProductsByPrice };
