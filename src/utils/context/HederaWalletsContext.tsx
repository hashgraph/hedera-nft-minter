import React from 'react';
import { BladeSigner } from '@bladelabs/blade-web3.js';
import { HashConnect } from 'hashconnect';
import { SaveDataType } from '@utils/types/hashconnect.types';
import useHashPack, {
  INITIAL_SAVE_DATA,
} from '@utils/hooks/wallets/useHashPack';
import useBladeWallet, {
  BladeAccountId,
} from '@utils/hooks/wallets/useBladeWallet';

interface HederaWalletsContextType {
  bladeSigner?: BladeSigner;
  hashConnect?: HashConnect;
  hashConnectSaveData: SaveDataType;
  bladeAccountId: BladeAccountId;
  connectBladeWallet: () => void;
  connectToHashPack: () => void;
  clearConnectedBladeWalletData: () => void;
  clearPairedAccountsAndHashPackWalletData: () => void;
}

const INITIAL_CONTEXT: HederaWalletsContextType = {
  hashConnect: undefined,
  bladeSigner: undefined,
  hashConnectSaveData: INITIAL_SAVE_DATA,
  bladeAccountId: '',
  clearPairedAccountsAndHashPackWalletData: () => undefined,
  connectBladeWallet: () => undefined,
  connectToHashPack: () => undefined,
  clearConnectedBladeWalletData: () => undefined,
};

export const HederaWalletsContext = React.createContext(INITIAL_CONTEXT);

export default function HederaWalletsProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const {
    bladeSigner,
    bladeAccountId,
    connectBladeWallet,
    clearConnectedBladeWalletData,
  } = useBladeWallet();

  const {
    hashConnect,
    hashConnectSaveData,
    connectToHashPack,
    clearPairedAccountsAndHashPackWalletData,
  } = useHashPack();

  return (
    <HederaWalletsContext.Provider
      value={{
        bladeSigner,
        hashConnect,
        hashConnectSaveData,
        bladeAccountId,
        connectBladeWallet,
        clearPairedAccountsAndHashPackWalletData,
        clearConnectedBladeWalletData,
        connectToHashPack,
      }}
    >
      {children}
    </HederaWalletsContext.Provider>
  );
}
