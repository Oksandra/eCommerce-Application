import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Nav } from './Nav';

describe('Nav', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('CATALOGUE')).toBeInTheDocument();
    expect(screen.getByText('ABOUT US')).toBeInTheDocument();
    expect(screen.getByText('LOG IN | SIGN UP')).toBeInTheDocument();
  });
});
