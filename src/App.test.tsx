import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe } from 'vitest';

import App from './App';
import { store } from './store';

const renderAppComponent = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

describe('App', () => {
  test('has button with text: Add Todo', () => {
    renderAppComponent();
    const button = screen.getByRole('button', { name: 'Add Todo' });

    expect(button).toBeInTheDocument();
  });
});
