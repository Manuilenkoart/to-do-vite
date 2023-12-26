import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { GlobalStyles } from '@/styles';

import { apolloClient } from './api';
import { router } from './router';
import { setupStore } from './store';

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyles />
      <ApolloProvider client={apolloClient}>
        <Provider store={setupStore()}>
          <RouterProvider router={router} />
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
