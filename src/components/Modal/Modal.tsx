import React from 'react';
import './Modal.scss';
import Message from '../Message/Message';

interface ModalProps {
  active: boolean;
  resultType: string;
  message: string;
}

const Modal: React.FC<ModalProps> = ({
  active,
  resultType,
  message,
}): JSX.Element => {
  return (
    <div className={active ? 'modal active' : 'modal'}>
      <div className="modal__content" data-type={resultType}>
        <Message type={resultType} messageError={message} />
      </div>
    </div>
  );
};

export default Modal;
