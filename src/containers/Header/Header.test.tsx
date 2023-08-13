import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const icons = document.querySelectorAll('img');
    expect(icons.length).toBe(4);
    expect(icons[0].alt).toBe('logo');
    expect(icons[1].alt).toBe('User');
    expect(icons[2].alt).toBe('Favorites');
    expect(icons[3].alt).toBe('Cart');
  });
});
