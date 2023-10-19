import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { HomePage } from './features';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <HomePage />
      <ToastContainer />
    </Provider>
  );
}

export default App;
