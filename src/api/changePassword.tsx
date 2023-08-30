import { ClientResponse } from '@commercetools/platform-sdk';
import apiRoot from '../sdk/client';

const changePassword = async (
  versionNumber: number,
  customerCurrentPassword: string,
  customerNewPassword: string
): Promise<ClientResponse> => {
  const idCustomer = localStorage.getItem('userWin4ik') as string;
  return apiRoot
    .customers()
    .password()
    .post({
      body: {
        version: versionNumber,
        id: idCustomer,
        currentPassword: customerCurrentPassword,
        newPassword: customerNewPassword,
      },
    })
    .execute();
};

export default changePassword;
