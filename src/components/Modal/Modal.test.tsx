import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  test('renders is correctly', () => {
    render(
      <Modal
        resultType="error"
        message="User with such email is already exist! Please go to page Log in ."
        active
      />
    );

    expect(
      screen.getByText(
        'User with such email is already exist! Please go to page Log in .'
      )
    ).toBeInTheDocument();

    expect(document.querySelector('.active')).toBeInTheDocument();

    expect(document.querySelector('.modal__content')).toBeInTheDocument();
  });
});
