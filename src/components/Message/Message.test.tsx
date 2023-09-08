import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from './Message';

describe('Message', () => {
  test('error is correctly', () => {
    render(
      <Message
        type="error"
        messageError="User with such email is already exist! Please go to page Log in ."
      />
    );

    expect(
      screen.getByText(
        'User with such email is already exist! Please go to page Log in .'
      )
    ).toBeInTheDocument();
  });

  test('successful is correctly', () => {
    render(
      <Message type="error" messageError="You have successfully registered!" />
    );

    expect(
      screen.getByText('You have successfully registered!')
    ).toBeInTheDocument();
  });

  test('error-server is correctly', () => {
    render(
      <Message
        type="error"
        messageError="Something went wrong, should try to sign in again later!"
      />
    );

    expect(
      screen.getByText(
        'Something went wrong, should try to sign in again later!'
      )
    ).toBeInTheDocument();
  });
});
