import React from 'react';

interface MessageProps {
  type: string;
}

const Message: React.FC<MessageProps> = ({ type }): JSX.Element => {
  const getMessage = (): string => {
    if (type === 'error') {
      return 'User with such email is already exist! Please go to page Log in .';
    }
    if (type === 'error-server') {
      return 'Something went wrong, should try to sign in again later!';
    }
    return 'You have successfully registered!';
  };
  const message = getMessage();
  return <span>{message}</span>;
};

export default Message;
