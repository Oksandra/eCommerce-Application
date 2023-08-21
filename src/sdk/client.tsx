import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient, projectKeyApi } from './BuildClient';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: projectKeyApi,
});

export default apiRoot;
