import React, { useState } from 'react';
import { Button } from '../Button/Button';
import './ProfileAddress.scss';
import Label from '../Label/Label';

interface ProfileAddressProps {
  typeAddress: string;
}

const ProfileAddress: React.FC<ProfileAddressProps> = ({
  typeAddress,
}): JSX.Element => {
  const [isDisabbleField, setDisaebledField] = useState(true);
  const clickButtonEdit = (): void => {
    setDisaebledField(false);
  };

  const clickButtonSave = (): void => {
    setDisaebledField(true);
  };
  return (
    <div className="profile__address-container">
      <Label
        text="Postal code"
        id={`${typeAddress}-code`}
        isDisabled={isDisabbleField}
        type="text"
      />
      <Label
        text="Country"
        id={`${typeAddress}-country`}
        isDisabled={isDisabbleField}
        type="text"
      />
      <Label
        text="City"
        id={`${typeAddress}-city`}
        isDisabled={isDisabbleField}
        type="text"
      />
      <Label
        text="Street"
        id={`${typeAddress}-street`}
        isDisabled={isDisabbleField}
        type="text"
      />
      <Button
        className="button-edit"
        textContent="Edit"
        type="button"
        onClick={clickButtonEdit}
      />
      <Button
        className="button-save"
        textContent="Save"
        type="button"
        onClick={clickButtonSave}
      />
    </div>
  );
};

export default ProfileAddress;
