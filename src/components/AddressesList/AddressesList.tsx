import React, { Dispatch, SetStateAction } from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import ProfileAddress from '../ProfileAddress.tsx/ProfileAddress';

interface AddressesListProps {
  addresses: BaseAddress[];
  version: number;
  setVersion: Dispatch<SetStateAction<number>>;
  defaultShippingAddress: string;
  defaultBillingAddress: string;
  setDefaultShippingAddress: Dispatch<SetStateAction<string>>;
  setDefaultBillingAddress: Dispatch<SetStateAction<string>>;
}

const AddressesList: React.FC<AddressesListProps> = ({
  addresses,
  version,
  setVersion,
  defaultShippingAddress,
  defaultBillingAddress,
  setDefaultShippingAddress,
  setDefaultBillingAddress,
}): JSX.Element => {
  return (
    <div className="items">
      {addresses.map((item) => (
        <ProfileAddress
          key={item.id}
          address={{ ...item }}
          version={version}
          setVersion={setVersion}
          defaultShippingAddress={defaultShippingAddress}
          defaultBillingAddress={defaultBillingAddress}
          setDefaultBillingAddress={setDefaultBillingAddress}
          setDefaultShippingAddress={setDefaultShippingAddress}
        />
      ))}
    </div>
  );
};

export default AddressesList;
