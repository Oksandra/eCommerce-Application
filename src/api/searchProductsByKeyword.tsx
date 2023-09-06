import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import apiRoot from '../sdk/client';

const searchProductsByKeyword = (
  text: string
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 100,
        fuzzy: true,
        'text.en-US': text,
      },
    })
    .execute();
};

export default searchProductsByKeyword;
