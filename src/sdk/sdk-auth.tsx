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
    clientId: 'X991W_0pKsACOTd3Xf-Fz51Q',
    clientSecret: 'dIR2AiYDJZKvmQDggqvxDFBgz2r2piSf',
  },
  scopes: ['manage_project:code-da-win4ik'],
  fetch,
});

const getCustomerToken = async (
  user: UserLogin,
  disableToken: DisableToken
): Promise<TokenInfo> => {
  return authClient.customerPasswordFlow(user, disableToken);
};

const getAnonimousToken = async (): Promise<TokenInfo> => {
  return authClient.anonymousFlow();
};

export { getCustomerToken, getAnonimousToken };
