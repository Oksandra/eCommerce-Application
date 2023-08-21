import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  Client,
} from '@commercetools/sdk-client-v2';

const oauthUri = 'https://auth.europe-west1.gcp.commercetools.com';
const baseUri = 'https://api.europe-west1.gcp.commercetools.com';
const credentials = {
  clientId: 'U_dKA1aIeI2QrDLPSYglNmQ4',
  clientSecret: 'ddPY7bXFPhdMw3v_v06R_pIqDmooV-Ia',
};
const projectKeyApi = 'ecommerce-application3';
const scopes = ['manage_project:ecommerce-application3'];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: oauthUri,
  projectKey: projectKeyApi,
  credentials: {
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: baseUri,
  fetch,
};

const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const loginRequest = (userLogin: string, userPassword: string): Client => {
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
    scopes,
    fetch,
  };

  return new ClientBuilder()
    .withPasswordFlow(passwordOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};

export { ctpClient, projectKeyApi, loginRequest };
