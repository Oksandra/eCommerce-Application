import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import './_notFound.scss';

export const NotFoundPage: FC = () => {
  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Oops! Thе page can`t be found.</p>
      <div className="not-found__underline" />
      <p className="not-found__text">
        We`re really sorry but we can`t find the page you are looking for.
      </p>
      <Link to="/">
        <Button
          className="not-found__button"
          textContent="BACK TO THE HOMEPAGE →"
          type="button"
        />
      </Link>
    </div>
  );
};
