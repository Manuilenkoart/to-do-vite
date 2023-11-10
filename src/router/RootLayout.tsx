import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Header, LineLoader } from '@/components';

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
