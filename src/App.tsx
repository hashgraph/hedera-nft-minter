import '@assets/styles/main.scss';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '@routes/index';
import AuthProvider from '@utils/context/AuthContext';
import HederaWalletsProvider from '@utils/context/HederaWalletsContext';
import ModalProvider from '@utils/context/ModalContext';

function App() {
  return (
    <ModalProvider>
      <AuthProvider>
        <HederaWalletsProvider>
          <>
            <Router>
              <Routes />
            </Router>
            <ToastContainer />
          </>
        </HederaWalletsProvider>
      </AuthProvider>
    </ModalProvider>
  );
}

export default App;
