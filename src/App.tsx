import '@assets/styles/main.scss';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '@routes/index';
import AuthProvider from '@utils/context/AuthContext';
import HashConnectProvider from '@utils/context/HashConnectContext';
import ModalProvider from '@utils/context/ModalContext';

function App() {
  return (
    <ModalProvider>
      <AuthProvider>
        <HashConnectProvider>
          <>
            <Router>
              <Routes />
            </Router>
            <ToastContainer />
          </>
        </HashConnectProvider>
      </AuthProvider>
    </ModalProvider>
  );
}

export default App;
