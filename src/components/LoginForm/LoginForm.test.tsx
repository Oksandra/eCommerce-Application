import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  test('renders login form correctly', () => {
    render(<LoginForm />);

    expect(screen.getByText('Login:')).toBeInTheDocument();
    expect(screen.getByText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  test('validates login and password fields', () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText('Please enter email.')).toBeInTheDocument();
    expect(screen.getByText('Please enter password.')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: '123' },
    });
    expect(
      screen.getByText("Email address must contain an '@' symbol.")
    ).toBeInTheDocument();
    expect(
      screen.getByText('Password must be at least 8 characters long.')
    ).toBeInTheDocument();
  });
});
