import SdkAuth from '@commercetools/sdk-auth';
import fetch from 'node-fetch';
import { projectKeyApi } from './BuildClient';

const authClient = new SdkAuth({
  host: 'https://auth.commercetools.com',
  projectKey: projectKeyApi,
  disableRefreshToken: false,
  credentials: {
    clientId: 'U_dKA1aIeI2QrDLPSYglNmQ4',
    clientSecret: 'ddPY7bXFPhdMw3v_v06R_pIqDmooV-Ia',
  },
  scopes: ['view_products:test', 'manage_orders:test'],
  fetch,
});

const token = authClient.clientCredentialsFlow();
