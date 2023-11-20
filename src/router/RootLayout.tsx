import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LineLoader } from '@/components';

import { Header } from './components';

function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<LineLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

export default RootLayout;
