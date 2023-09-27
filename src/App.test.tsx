import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe } from 'vitest';

import App from './App';

const renderAppComponent = () => render(<App />);

describe('App', () => {
  test('has H1 with text: Vite + React', () => {
    renderAppComponent();
    const text = screen.getByRole('heading', { level: 1, name: 'Vite + React' });

    expect(text).toBeInTheDocument();
  });

  test('increments count when button is clicked', async () => {
    const user = userEvent.setup();
    renderAppComponent();

    const button = screen.getByRole('button', { name: 'count is 0' });

    expect(button).toBeInTheDocument();
    await user.click(button);

    const updatedButton = screen.getByRole('button', { name: 'count is 1' });
    expect(updatedButton).toBeInTheDocument();
  });
});
