import '@assets/styles/main.scss';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '@routes/index';
import HederaWalletsProvider from '@utils/context/HederaWalletsContext';
import ModalProvider from '@utils/context/ModalContext';
import LayoutProvider from '@utils/context/LayoutContext';

function App() {
  return (
    <LayoutProvider>
      <ModalProvider>
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
      </ModalProvider>
    </LayoutProvider>
  );
}

export default App;
