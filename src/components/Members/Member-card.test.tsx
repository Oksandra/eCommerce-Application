import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Member } from './Member-card';
import { MEMBERS } from './members-info';

describe('Member card', () => {
  test('renders correctly', () => {
    render(<Member member={MEMBERS[0]} />);
    expect(screen.getByText('Oksana Golovina')).toBeInTheDocument();
    expect(screen.getByText('Team Lead')).toBeInTheDocument();
  });

  test('show modal window on click', () => {
    render(<Member member={MEMBERS[0]} />);
    fireEvent.click(screen.getByText('Team Lead'));
    expect(screen.getByText('Contributions')).toBeInTheDocument();
  });
});
