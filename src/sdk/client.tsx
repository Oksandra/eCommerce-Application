import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ctpClient, projectKeyApi, tokenClient } from './BuildClient';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: projectKeyApi,
});

const tokenApiRoot = (token: string): ByProjectKeyRequestBuilder => {
  return createApiBuilderFromCtpClient(tokenClient(token)).withProjectKey({
    projectKey: projectKeyApi,
  });
};

export { apiRoot, tokenApiRoot };
