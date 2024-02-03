import { screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import { mockApolloQuery, renderWithApollo } from '@/test';

import { todosQuery } from './graphql';
import TodoPage from './Todo';

describe('Toto', () => {
  it('has button with text: Add Todo', () => {
    renderWithApollo(<TodoPage />, { mocks: mockApolloQuery(todosQuery, { todos: [] }) });
    const button = screen.getByRole('button', { name: /add todo/i });

    expect(button).toBeInTheDocument();
  });
});
