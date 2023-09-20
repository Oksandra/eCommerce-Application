import React from 'react';
import './ModalPage.scss';

interface ModalProductPageProps {
  active: boolean;
  setActive: (state: boolean) => void;
  children: React.ReactNode;
}

const ModalProductPage: React.FC<ModalProductPageProps> = ({
  active,
  setActive,
  children,
}) => {
  return (
    <div
      aria-hidden="true"
      onClick={(): void => setActive(false)}
      className={active ? 'modal-page active' : 'modal-page'}
    >
      <div
        aria-hidden="true"
        className={
          active ? 'modal-page__content active' : 'modal-page__content'
        }
        onClick={(e): void => e.stopPropagation()}
      >
        {children}
        <span
          aria-hidden="true"
          onClick={(): void => setActive(false)}
          className="close-btn"
        >
          &times;
        </span>
      </div>
    </div>
  );
};

export default ModalProductPage;
