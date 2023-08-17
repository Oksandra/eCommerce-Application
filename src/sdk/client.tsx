import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient, projectKeyApi } from './BuildClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: projectKeyApi,
});

export default apiRoot;
