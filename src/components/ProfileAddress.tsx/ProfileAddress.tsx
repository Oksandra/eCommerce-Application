import React, { useState, Dispatch, SetStateAction } from 'react';
import { Button } from '../Button/Button';
import './ProfileAddress.scss';
import Label from '../Label/Label';

interface ProfileAddressProps {
  typeAddress: string;
  setCode: Dispatch<SetStateAction<string>>;
  setCity: Dispatch<SetStateAction<string>>;
  setCountry: Dispatch<SetStateAction<string>>;
  setStreet: Dispatch<SetStateAction<string>>;
  customerCode: string;
  customerCountry: string;
  customerCity: string;
  customerStreet: string;
}

const ProfileAddress: React.FC<ProfileAddressProps> = ({
  typeAddress,
  setCode,
  setCity,
  setCountry,
  setStreet,
  customerCode,
  customerCountry,
  customerCity,
  customerStreet,
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
        value={customerCode}
        isDisabled={isDisabbleField}
        type="text"
        setRequestInfo={setCode}
      />
      <Label
        text="Country"
        id={`${typeAddress}-country`}
        value={customerCountry}
        isDisabled={isDisabbleField}
        type="text"
        setRequestInfo={setCountry}
      />
      <Label
        text="City"
        id={`${typeAddress}-city`}
        value={customerCity}
        isDisabled={isDisabbleField}
        type="text"
        setRequestInfo={setCity}
      />
      <Label
        text="Street"
        id={`${typeAddress}-street`}
        value={customerStreet}
        isDisabled={isDisabbleField}
        type="text"
        setRequestInfo={setStreet}
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
