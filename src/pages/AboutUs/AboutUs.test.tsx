import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AboutUs } from './AboutUs';

describe('About Us', () => {
  test('renders correctly', () => {
    render(<AboutUs />);
    expect(screen.getByText('Oksana Golovina')).toBeInTheDocument();
    expect(screen.getByText('Team Lead')).toBeInTheDocument();
    expect(screen.getByText('Anastasiya Alisenok')).toBeInTheDocument();
    expect(screen.getByText('Master of backend')).toBeInTheDocument();
    expect(screen.getByText('Dmitriy Kulkov')).toBeInTheDocument();
    expect(screen.getByText('Member')).toBeInTheDocument();
  });

  test('show modal window on click', () => {
    render(<AboutUs />);
    fireEvent.click(screen.getByText('Member'));
    expect(screen.getByText('Contributions')).toBeInTheDocument();
  });

  test('hidden modal window on click', () => {
    render(<AboutUs />);
    fireEvent.click(screen.getByText('Member'));
    fireEvent.click(screen.getByText('Contributions'));
    expect(screen.queryByText('Contributions')).not.toBeInTheDocument();
  });
});
