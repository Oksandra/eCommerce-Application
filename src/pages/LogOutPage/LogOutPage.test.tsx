import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LogOutPage from './LogOutPage';

describe('Log Out Page', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <LogOutPage />
      </BrowserRouter>
    );

    expect(
      screen.getByText('Are you sure you want to leave?')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log Out' })).toBeInTheDocument();
  });

  test('works click on button correctly', () => {
    render(
      <BrowserRouter>
        <LogOutPage />
      </BrowserRouter>
    );

    localStorage.setItem('userWin4ik', 'user');
    fireEvent.click(screen.getByRole('button', { name: 'Log Out' }));
    expect(localStorage.getItem('userWin4ik')).toBeNull();
  });
});
