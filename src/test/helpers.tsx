import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@/store';

export const renderWithStore = (Component: ReactElement) =>
  rtlRender(Component, { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> });

export const renderWithRouter = (Component: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...rtlRender(Component, { wrapper: BrowserRouter }),
  };
};
export const generateString = (length: number) => 'x'.repeat(length);
