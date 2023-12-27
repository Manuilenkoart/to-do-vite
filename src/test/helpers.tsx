/* eslint-disable import/no-extraneous-dependencies */
import { MockedProvider } from '@apollo/client/testing';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

export function renderWithApollo(
  children: ReactElement,
  { mocks, addTypename = false }: { mocks: any; addTypename?: boolean }
) {
  return {
    user: userEvent.setup(),
    ...rtlRender(
      <MockedProvider mocks={mocks} addTypename={addTypename}>
        {children}
      </MockedProvider>
    ),
  };
}
export const mockApolloQuery = (query: any, resultData: any) => [
  {
    request: {
      query,
    },
    result: {
      data: {
        ...resultData,
      },
    },
  },
];

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
