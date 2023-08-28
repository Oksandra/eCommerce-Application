import { ClientResponse } from '@commercetools/platform-sdk';
import apiRoot from '../sdk/client';

const updateCustomerName = async (
  customerName: string,
  versionNumber: number
): Promise<ClientResponse> => {
  const id = localStorage.getItem('userWin4ik') as string;
  return apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: versionNumber,
        actions: [
          {
            action: 'setFirstName',
            firstName: customerName,
          },
        ],
      },
    })
    .execute();
};

const updateCustomerLastName = async (
  customerLastName: string,
  versionNumber: number
): Promise<ClientResponse> => {
  const id = localStorage.getItem('userWin4ik') as string;
  return apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: versionNumber,
        actions: [
          {
            action: 'setLastName',
            lastName: customerLastName,
          },
        ],
      },
    })
    .execute();
};

const updateCustomerEmail = async (
  customerEmail: string,
  versionNumber: number
): Promise<ClientResponse> => {
  const id = localStorage.getItem('userWin4ik') as string;
  return apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: versionNumber,
        actions: [
          {
            action: 'changeEmail',
            email: customerEmail,
          },
        ],
      },
    })
    .execute();
};

const updateCustomerDateBirth = async (
  date: string,
  versionNumber: number
): Promise<ClientResponse> => {
  const id = localStorage.getItem('userWin4ik') as string;
  return apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: versionNumber,
        actions: [
          {
            action: 'setDateOfBirth',
            dateOfBirth: date,
          },
        ],
      },
    })
    .execute();
};

export {
  updateCustomerName,
  updateCustomerLastName,
  updateCustomerDateBirth,
  updateCustomerEmail,
};
