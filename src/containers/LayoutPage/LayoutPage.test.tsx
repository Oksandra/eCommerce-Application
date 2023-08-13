import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LayoutPage } from './LayoutPage';

describe('LayoutPage', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <LayoutPage />
      </MemoryRouter>
    );

    expect(document.querySelector('.header')).toBeInTheDocument();
    expect(document.querySelector('.footer')).toBeInTheDocument();
  });
});
