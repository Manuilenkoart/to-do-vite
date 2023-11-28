import { EntityState } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import { InitialAdapterState, Todo } from '@/api';
import { renderWithProviders, todo } from '@/test';

import TodoPage from './Todo';

describe('Toto', () => {
  it('has button with text: Add Todo', () => {
    renderWithProviders(<TodoPage />);
    const button = screen.getByRole('button', { name: /add todo/i });

    expect(button).toBeInTheDocument();
  });

  it('handleDeleteTodoClick', async () => {
    const preloadState: EntityState<Todo> & InitialAdapterState = {
      ids: [todo.id],
      entities: { [todo.id]: todo },
      status: 'idle',
      currentIds: [],
      error: '',
    };
    renderWithProviders(<TodoPage />, {
      preloadedState: { todoState: preloadState },
    });
  });
});
