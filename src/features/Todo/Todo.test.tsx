import { screen } from '@testing-library/react';
import { describe } from 'vitest';

import { renderWithStore } from '@/test';

import Todo from './Todo';

describe('Toto', () => {
  it('has button with text: Add Todo', () => {
    renderWithStore(<Todo />);
    const button = screen.getByRole('button', { name: 'Add todo' });

    expect(button).toBeInTheDocument();
  });
});
