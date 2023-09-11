import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  Client,
  type AnonymousAuthMiddlewareOptions,
  TokenStore,
  ExistingTokenMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const oauthUri = 'https://auth.europe-west1.gcp.commercetools.com';
const baseUri = 'https://api.europe-west1.gcp.commercetools.com';
const credentials = {
  clientId: 'U_dKA1aIeI2QrDLPSYglNmQ4',
  clientSecret: 'ddPY7bXFPhdMw3v_v06R_pIqDmooV-Ia',
};
const projectKeyApi = 'ecommerce-application3';
const scopesAll = ['manage_project:ecommerce-application3'];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: oauthUri,
  projectKey: projectKeyApi,
  credentials: {
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
  },
  tokenCache: {
    get: (): TokenStore => {
      const obj = JSON.parse(localStorage.getItem('tokenWin4ik') as string);
      return obj;
    },
    set: (obj: TokenStore) => {
      localStorage.setItem('tokenWin4ik', JSON.stringify(obj));
    },
  },
  scopes: scopesAll,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: baseUri,
  fetch,
};

const tokenClient = (token: string): Client => {
  return new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withExistingTokenFlow(token, { force: false })
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};

const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const passwordRequest = (userLogin: string, userPassword: string): Client => {
  const passwordOptions: PasswordAuthMiddlewareOptions = {
    host: oauthUri,
    projectKey: projectKeyApi,
    credentials: {
      clientId: credentials.clientId,
      clientSecret: credentials.clientSecret,
      user: {
        username: userLogin,
        password: userPassword,
      },
    },
    tokenCache: {
      get: (): TokenStore => {
        const obj = JSON.parse(localStorage.getItem('tokenWin4ik') as string);
        return obj;
      },
      set: (obj: TokenStore) => {
        localStorage.setItem('tokenWin4ik', JSON.stringify(obj));
      },
    },
    scopes: scopesAll,
    fetch,
  };

  return new ClientBuilder()
    .withPasswordFlow(passwordOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};

const anonimousRequest = (): Client => {
  const optionsAnonimous: AnonymousAuthMiddlewareOptions = {
    host: oauthUri,
    projectKey: projectKeyApi,
    credentials: {
      clientId: credentials.clientId,
      clientSecret: credentials.clientSecret,
      anonymousId: process.env.CTP_ANONYMOUS_ID,
    },
    tokenCache: {
      get: (): TokenStore => {
        const obj = JSON.parse(
          localStorage.getItem('anonimTokenWin4ik') as string
        );
        return obj;
      },
      set: (obj: TokenStore) => {
        localStorage.setItem('anonimTokenWin4ik', JSON.stringify(obj));
      },
    },
    scopes: scopesAll,
    fetch,
  };
  return new ClientBuilder()
    .withAnonymousSessionFlow(optionsAnonimous)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};

const existingTokenRequest = (): Client => {
  const authorization: TokenStore = JSON.parse(
    localStorage.getItem('anonimTokenWin4ik') as string
  );
  const token = `Bearer ${authorization.token}`;
  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };
  return new ClientBuilder()
    .withExistingTokenFlow(token, options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};

const existingTokenCustomerRequest = (): Client => {
  const authorization: TokenStore = JSON.parse(
    localStorage.getItem('tokenWin4ik') as string
  );
  const token = `Bearer ${authorization.token}`;
  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };
  return new ClientBuilder()
    .withExistingTokenFlow(token, options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};

export {
  ctpClient,
  projectKeyApi,
  passwordRequest,
  anonimousRequest,
  tokenClient,
  existingTokenRequest,
  existingTokenCustomerRequest,
};
