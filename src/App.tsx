import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { GlobalStyles } from '@/styles';

import { router } from './router';
import { setupStore } from './store';

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyles />

      <Provider store={setupStore()}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
