import { createBrowserRouter } from 'react-router-dom';

import { TodoPage } from '@/features';

import { ErrorBoundary } from './components/ErrorBoundary';
import { NoMatch } from './components/NoMatch';
import RootLayout from './RootLayout';
import ROUTER_PATH from './routerPath';

const router = createBrowserRouter([
  {
    path: ROUTER_PATH.root,
    element: <RootLayout />,
    children: [
      {
        path: ROUTER_PATH.todo.index,
        element: <TodoPage />,
      },
      { path: ROUTER_PATH.noMatch, element: <NoMatch /> },
    ],
    errorElement: <ErrorBoundary />,
  },
]);

export default router;
