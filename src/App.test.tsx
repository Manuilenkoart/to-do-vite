import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'vitest';

import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('has H1 with text: Vite + React', () => {
    const text = screen.getByRole('heading', { level: 1, name: 'Vite + React' });

    expect(text).toBeInTheDocument();
  });

  test('increments count when button is clicked', () => {
    const button = screen.getByRole('button', { name: 'count is 0' });

    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const updatedButton = screen.getByRole('button', { name: 'count is 1' });
    expect(updatedButton).toBeInTheDocument();
  });
});
