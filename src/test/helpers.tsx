import { render as rtlRender } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store';

export const renderWithStore = (Component: ReactElement) =>
  rtlRender(Component, { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> });

export const generateString = (length: number) => 'x'.repeat(length);
