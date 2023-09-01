import React, { Dispatch, SetStateAction } from 'react';

interface LabelProps {
  text: string;
  id: string;
  isDisabled: boolean;
  type: string;
  value: string;
  setRequestInfo: Dispatch<SetStateAction<string>>;
  handleChange: (value: string) => string;
  setError: Dispatch<SetStateAction<string>>;
}

const Label: React.FC<LabelProps> = ({
  text,
  id,
  isDisabled,
  type,
  value,
  setRequestInfo,
  handleChange,
  setError,
}): JSX.Element => {
  return (
    <>
      <label htmlFor={id} className="profile-field__label">
        {text}
      </label>
      <input
        className="profile-field__input"
        id={id}
        type={type}
        value={value}
        disabled={isDisabled}
        onChange={(event): void => {
          setRequestInfo(event.target.value);
          setError(handleChange(event.target.value));
        }}
      />
    </>
  );
};

export default Label;
