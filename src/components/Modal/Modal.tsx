import React from 'react';
import './Modal.scss';
import Message from '../Message/Message';

interface ModalProps {
  active: boolean;
  resultType: string;
}

const Modal: React.FC<ModalProps> = ({ active, resultType }): JSX.Element => {
  return (
    <div className={active ? 'modal active' : 'modal'}>
      <div className="modal__content" data-type={resultType}>
        <Message type={resultType} />
      </div>
    </div>
  );
};

export default Modal;
