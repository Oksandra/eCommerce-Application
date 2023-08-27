import React, { useState } from 'react';
import ProfileField from '../ProfileField/ProfileField';
import './Profile.scss';
import ProfileAddress from '../ProfileAddress.tsx/ProfileAddress';
import { Button } from '../Button/Button';
import Label from '../Label/Label';

const Profile = (): JSX.Element => {
  const [isDisabledFirstName, setDisabledFirstName] = useState(true);
  const [isDisabledLastName, setDisabledLastName] = useState(true);
  const [isDisabledDateBirth, setDisabledDateBirth] = useState(true);
  const [isDisabledEmail, setDisabledEmail] = useState(true);
  const [isOpen, setOpen] = useState(true);

  const clickChangePassword = (): void => {
    setOpen(!isOpen);
  };

  return (
    <div className="profile">
      <h2 className="profile__title">Profile</h2>
      <ProfileField
        text="Email"
        id="email"
        isDisabled={isDisabledEmail}
        setDisabled={setDisabledEmail}
      />
      <ProfileField
        text="First name"
        id="first-name"
        isDisabled={isDisabledFirstName}
        setDisabled={setDisabledFirstName}
      />
      <ProfileField
        text="Last name"
        id="last-name"
        isDisabled={isDisabledLastName}
        setDisabled={setDisabledLastName}
      />
      <ProfileField
        text="Date of birth"
        id="date-birth"
        isDisabled={isDisabledDateBirth}
        setDisabled={setDisabledDateBirth}
      />
      <h3 className="profile__address-title">Shipping address</h3>
      <ProfileAddress typeAddress="shipping" />
      <h3 className="profile__address-title">Billing address</h3>
      <ProfileAddress typeAddress="billing" />
      <Button
        className="button-change"
        textContent="Change password"
        type="button"
        onClick={clickChangePassword}
      />
      <div
        className={
          isOpen ? 'profile__change-password' : 'profile__change-password open'
        }
      >
        <Label
          text="Current password"
          id="current-password"
          isDisabled={false}
          type="password"
        />
        <Label
          text="New password"
          id="new-password"
          isDisabled={false}
          type="password"
        />
        <Button
          className="button-save__password"
          textContent="Save password"
          type="button"
        />
      </div>
    </div>
  );
};

export default Profile;
