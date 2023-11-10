import { screen } from '@testing-library/react';
import { describe } from 'vitest';

import { renderWithProviders } from '@/test';

import Todo from './Todo';

describe('Toto', () => {
  it('has button with text: Add Todo', () => {
    renderWithProviders(<Todo />);
    const button = screen.getByRole('button', { name: /add todo/i });

    expect(button).toBeInTheDocument();
  });
});
