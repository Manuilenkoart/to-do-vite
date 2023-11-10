import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe } from 'vitest';

import { store } from '../../store';
import Todo from './Todo';

const renderAppComponent = () =>
  render(
    <Provider store={store}>
      <Todo />
    </Provider>
  );

describe('App', () => {
  test('has button with text: Add Todo', () => {
    renderAppComponent();
    const button = screen.getByRole('button', { name: 'Add todo' });

    expect(button).toBeInTheDocument();
  });
});
