import { screen } from '@testing-library/react';
import { describe } from 'vitest';

import { rtlStore } from '@/test';

import Todo from './Todo';

describe('Toto', () => {
  it('has button with text: Add Todo', () => {
    rtlStore(<Todo />);
    const button = screen.getByRole('button', { name: 'Add todo' });

    expect(button).toBeInTheDocument();
  });
});
