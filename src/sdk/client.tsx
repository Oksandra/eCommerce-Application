import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { anonimousClient, ctpClient, projectKeyApi } from './BuildClient';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: projectKeyApi,
});

const anonimousApiRoot = createApiBuilderFromCtpClient(
  anonimousClient
).withProjectKey({
  projectKey: projectKeyApi,
});

export { apiRoot, anonimousApiRoot };
