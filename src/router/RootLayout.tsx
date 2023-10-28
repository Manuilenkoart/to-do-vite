import 'react-toastify/dist/ReactToastify.css';

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header, LineLoader } from '@/components';
import { GlobalStyles } from '@/styles';

function RootLayout() {
  return (
    <>
      <GlobalStyles />
      <ToastContainer />

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
