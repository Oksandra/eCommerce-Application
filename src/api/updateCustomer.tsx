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
              postalCode: code,
              city: customerCity,
              country: customerCountry,
            },
          },
        ],
      },
    })
    .execute();
};

const deleteCustomerAddress = async (
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
            action: 'removeAddress',
            addressId: idAddress,
          },
        ],
      },
    })
    .execute();
};

const addCustomerAddress = async (
  code: string,
  customerCountry: string,
  customerCity: string,
  customerStreet: string,
  versionNumber: number,
  keyAddress: string
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
            action: 'addAddress',
            address: {
              key: keyAddress,
              streetName: customerStreet,
              postalCode: code,
              city: customerCity,
              country: customerCountry,
            },
          },
        ],
      },
    })
    .execute();
};

const addShippingAddressId = async (
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
            action: 'addShippingAddressId',
            addressId: idAddress,
          },
        ],
      },
    })
    .execute();
};

const addBillingAddressId = async (
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
            action: 'addBillingAddressId',
            addressId: idAddress,
          },
        ],
      },
    })
    .execute();
};

const addDefaultBillingAddressId = async (
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
            action: 'setDefaultBillingAddress',
            addressId: idAddress,
          },
        ],
      },
    })
    .execute();
};

const addDefaultShippingAddressId = async (
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
            action: 'setDefaultShippingAddress',
            addressId: idAddress,
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
  deleteCustomerAddress,
  addCustomerAddress,
  addShippingAddressId,
  addBillingAddressId,
  addDefaultBillingAddressId,
  addDefaultShippingAddressId,
};
