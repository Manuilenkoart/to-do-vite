import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { GlobalStyles } from '@/styles';

import { apolloClient } from './api';
import { router } from './router';

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyles />
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </>
  );
}

export default App;
