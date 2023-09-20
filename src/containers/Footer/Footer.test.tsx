import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  test('renders correctly', () => {
    render(<Footer />);

    expect(screen.getByText('© CODE DA WIN4IK')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(document.querySelector('.footer__logo')).toBeInTheDocument();
  });
});
