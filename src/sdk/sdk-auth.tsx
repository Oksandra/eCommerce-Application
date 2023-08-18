import SdkAuth from '@commercetools/sdk-auth';
import fetch from 'node-fetch';
import { TokenInfo } from '@commercetools/sdk-client-v2';
import { projectKeyApi } from './BuildClient';
import { UserLogin } from '../interfaces/interfaces';

interface DisableToken {
  disableRefreshToken: boolean;
}

const authClient = new SdkAuth({
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: projectKeyApi,
  disableRefreshToken: false,
  credentials: {
    clientId: 'U_dKA1aIeI2QrDLPSYglNmQ4',
    clientSecret: 'ddPY7bXFPhdMw3v_v06R_pIqDmooV-Ia',
  },
  scopes: ['manage_project:ecommerce-application3'],
  fetch,
});

const getCustomerToken = async (
  user: UserLogin,
  disableToken: DisableToken
): Promise<TokenInfo> => {
  return authClient.customerPasswordFlow(user, disableToken);
};

export default getCustomerToken;
