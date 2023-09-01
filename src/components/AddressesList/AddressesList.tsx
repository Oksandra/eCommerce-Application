import React, { Dispatch, SetStateAction } from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import ProfileAddress from '../ProfileAddress.tsx/ProfileAddress';

interface AddressesListProps {
  addresses: BaseAddress[];
  version: number;
  setVersion: Dispatch<SetStateAction<number>>;
}

const AddressesList: React.FC<AddressesListProps> = ({
  addresses,
  version,
  setVersion,
}): JSX.Element => {
  return (
    <div className="items">
      {addresses.map((item) => (
        <ProfileAddress
          key={item.id}
          address={{ ...item }}
          version={version}
          setVersion={setVersion}
        />
      ))}
    </div>
  );
};

export default AddressesList;
