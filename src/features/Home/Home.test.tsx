import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { describe } from 'vitest';

import { store } from '../../store';
import Home from './Home';

const renderAppComponent = () =>
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

describe('App', () => {
  test('has button with text: Add Todo', () => {
    renderAppComponent();
    const button = screen.getByRole('button', { name: 'Add todo' });

    expect(button).toBeInTheDocument();
  });
});
