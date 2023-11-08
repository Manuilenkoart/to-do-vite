import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { store } from '@/store';

export const renderWithProviders = (Component: ReactElement) =>
  rtlRender(Component, { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> });

export const renderWithRouter = (Component: ReactElement, { path = '/', initialEntries = ['/'] } = {}) => {
  const routes = [
    {
      path,
      element: Component,
    },
  ];

  const memoryRouter = createMemoryRouter(routes, {
    initialEntries,
  });

  return {
    user: userEvent.setup(),
    ...rtlRender(<RouterProvider router={memoryRouter} />),
  };
};

export const generateStringLength = (length: number) => 'x'.repeat(length);
