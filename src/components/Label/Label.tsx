import React from 'react';

interface LabelProps {
  text: string;
  id: string;
  isDisabled: boolean;
  type: string;
}

const Label: React.FC<LabelProps> = ({
  text,
  id,
  isDisabled,
  type,
}): JSX.Element => {
  return (
    <>
      <label htmlFor={id} className="profile-field__label">
        {text}
      </label>
      <input
        className="profile-field__input"
        id={id}
        type={type === 'text' ? 'text' : 'password'}
        disabled={isDisabled}
      />
    </>
  );
};

export default Label;
