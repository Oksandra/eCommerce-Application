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

const updateCustomerAddress = async (
  code: string,
  customerCountry: string,
  customerCity: string,
  customerStreet: string,
  versionNumber: number,
  idAddress: string
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
            action: 'changeAddress',
            addressId: idAddress,
            address: {
              streetName: customerStreet,
              city: customerCity,
              country: customerCountry,
              postalCode: code,
            },
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
  updateCustomerAddress,
};
