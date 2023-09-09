import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import apiRoot from '../sdk/client';

const searchProductsByKeyword = (
  text: string,
  page: number
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 6,
        offset: page,
        fuzzy: true,
        'text.en-US': text,
      },
    })
    .execute();
};

export default searchProductsByKeyword;
