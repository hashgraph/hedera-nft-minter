import '@assets/styles/main.scss';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '@routes/index';
import AuthProvider from '@utils/context/AuthContext';
import HederaWalletsProvider from '@utils/context/HederaWalletsContext';
import ModalProvider from '@utils/context/ModalContext';
import LayoutProvider from '@utils/context/LayoutContext';

function App() {
  return (
    <LayoutProvider>
      <ModalProvider>
        <AuthProvider>
          <HederaWalletsProvider>
            <>
              <Router>
                <Routes />
              </Router>
              <ToastContainer
                theme='dark'
                position='bottom-right'
                newestOnTop
              />
            </>
          </HederaWalletsProvider>
        </AuthProvider>
      </ModalProvider>
    </LayoutProvider>
  );
}

export default App;
