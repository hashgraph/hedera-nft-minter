import '@assets/styles/main.scss';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '@routes/index';
import AuthProvider from '@utils/context/AuthContext';
import HashConnectClientProvider from '@utils/context/HashConnectClientContext';
import HashConnectProvider from './utils/context/HashConnectContext';

function App() {
  return (
    <AuthProvider>
      <HashConnectClientProvider>
        <HashConnectProvider>
          <>
            <Router>
              <Routes />
            </Router>
            <ToastContainer />
          </>
        </HashConnectProvider>
      </HashConnectClientProvider>
    </AuthProvider>
  );
}

export default App;
