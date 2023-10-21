import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header } from '@/components';

function RootLayout() {
  return (
    <>
      <ToastContainer />

      <Header />
      <Outlet />
    </>
  );
}

export default RootLayout;
