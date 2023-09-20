import React from 'react';

interface MessageProps {
  type: string;
  messageError: string;
}

const Message: React.FC<MessageProps> = ({
  type,
  messageError,
}): JSX.Element => {
  const getMessage = (): string => {
    if (type === 'error') {
      return messageError;
    }
    if (type === 'error-server') {
      return messageError;
    }
    return messageError;
  };
  const message = getMessage();
  return <span>{message}</span>;
};

export default Message;
