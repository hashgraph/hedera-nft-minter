import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { BladeSigner } from '@bladelabs/blade-web3.js';
import { loadLocalData } from '@/utils/helpers/loadLocalData';

export const BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME =
  'minerPocBladeWalletData';

export type BladeAccountId = string;
const bladeSigner = new BladeSigner();

const useBladeWallet = () => {
  const [bladeAccountId, setBladeAccountId] = useState<BladeAccountId>('');

  //CLEANER
  const clearConnectedBladeWalletData = useCallback(() => {
    localStorage.removeItem(BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME);
    setBladeAccountId('');
  }, [setBladeAccountId]);

  //CONNECTION
  const connectBladeWallet = useCallback(async () => {
    let loggedId = '';

    try {
      await bladeSigner.createSession();
      loggedId = bladeSigner.getAccountId().toString();
    } catch (e) {
      if (typeof e === 'function') {
        const { message } = e();
        toast.error(message);
      } else if (typeof e === 'string') {
        toast.error(e);
      } else if (e instanceof Error) {
        toast.error(e.message);
      }
    } finally {
      if (!loggedId) {
        toast.error('Cannot find connected account id in Blade Wallet!');
      } else {
        if (!loadLocalData(BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME)) {
          toast.success('Blade Wallet has been connected!');
        }
        setBladeAccountId(loggedId);
        localStorage.setItem(
          BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME,
          JSON.stringify({
            bladeAccountId: loggedId,
          })
        );
      }
    }
  }, [setBladeAccountId]);

  //INITIALIZATION
  const initializeBladeWallet = useCallback(async () => {
    const wasConnected = loadLocalData(BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME);
    if (wasConnected) {
      await connectBladeWallet();
    }
  }, [connectBladeWallet]);

  useEffect(() => {
    initializeBladeWallet();
  }, [initializeBladeWallet]);

  return {
    bladeSigner,
    bladeAccountId,
    connectBladeWallet,
    clearConnectedBladeWalletData,
  };
};

export default useBladeWallet;