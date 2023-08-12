import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('LoginForm', () => {
  test('renders login form correctly', () => {
    render(<Button className="test" textContent="Button" type="button" />);

    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument();
  });
});
