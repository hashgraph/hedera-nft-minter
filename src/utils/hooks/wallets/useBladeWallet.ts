/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { APP_NAME, HEDERA_NETWORK } from '@src/../Global.d';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { BladeSigner, HederaNetwork } from '@bladelabs/blade-web3.js';
import { loadLocalData } from '@utils/helpers/loadLocalData';

export type BladeAccountId = string;

export const BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME = `${ APP_NAME ?? 'mintbar' }BladeWalletData`;

const BLADE_SIGNER_PARAMS = {
  network: HEDERA_NETWORK === 'mainnet' ? HederaNetwork.Mainnet : HederaNetwork.Testnet,
  dAppCode: APP_NAME
}
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
      await bladeSigner.createSession(BLADE_SIGNER_PARAMS);
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

  //LISTEN FOR ACCOUNT CHANGES
  useEffect(() => {
    bladeSigner.onAccountChanged(connectBladeWallet)
  }, [connectBladeWallet])

  return {
    bladeSigner,
    bladeAccountId,
    connectBladeWallet,
    clearConnectedBladeWalletData,
  };
};

export default useBladeWallet;
