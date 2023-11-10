import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './components';
import RootLayout from './RootLayout';
import ROUTER_PATH from './routerPath';

const TodoPageLazy = lazy(() => import('@/features/Todo').then(({ TodoPage }) => ({ default: TodoPage })));
const NoMatchLazy = lazy(() => import('./components/NoMatch').then(({ NoMatch }) => ({ default: NoMatch })));

const router = createBrowserRouter([
  {
    path: ROUTER_PATH.root,
    element: <RootLayout />,
    children: [
      {
        path: ROUTER_PATH.todo.index,
        element: <TodoPageLazy />,
      },
      { path: ROUTER_PATH.noMatch, element: <NoMatchLazy /> },
    ],
    errorElement: <ErrorBoundary />,
  },
]);

export default router;
