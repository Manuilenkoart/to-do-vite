// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '@/store';

export const rtlStore = (children: JSX.Element) => render(<Provider store={store}>{children}</Provider>);

export const generateString = (length: number) => 'x'.repeat(length);
