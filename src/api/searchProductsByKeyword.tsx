import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import apiRoot from '../sdk/client';

const searchProductsByKeyword = (
  text: string
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 100,
        fuzzy: true,
        'text.en': text,
      },
    })
    .execute();
};

export default searchProductsByKeyword;
