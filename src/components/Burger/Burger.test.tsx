import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Burger } from './Burger';

describe('Burger', () => {
  const setState = jest.fn();

  test('renders correctly', () => {
    render(<Burger state={setState} />);
    const burger = document.querySelector('.burger');
    expect(burger).toBeInTheDocument();
    expect(burger?.childElementCount).toBe(3);
  });

  test('toggles burger state on click', () => {
    render(<Burger state={setState} />);
    const burger = document.querySelector('.burger') as HTMLElement;
    fireEvent.click(burger);
    expect(burger.classList.contains('burger_active')).toBe(true);
  });
});
