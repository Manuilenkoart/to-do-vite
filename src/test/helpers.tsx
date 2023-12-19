/* eslint-disable import/no-extraneous-dependencies */
import { PreloadedState } from '@reduxjs/toolkit';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { AppStore, RootState } from '@/api';
import { setupStore } from '@/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }), user: userEvent.setup() };
}

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
