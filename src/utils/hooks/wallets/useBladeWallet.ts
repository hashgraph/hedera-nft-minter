/* eslint-disable @typescript-eslint/no-unused-vars */
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

import {
  BLADE_WALLET_DAPP_CODE,
  HEDERA_NETWORK,
  WALLET_CONFIG_DESCRIPTION,
  WALLET_CONFIG_ICON_URL,
  WALLET_CONFIG_NAME,
  WALLET_CONFIG_URL,
} from '@src/../Global.d';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import isNull from 'lodash/isNull';
import isString from 'lodash/isString';
import {
  BladeConnector,
  ConnectorStrategy,
  ErrorCodes,
  HederaNetwork,
  WalletError,
} from '@bladelabs/blade-web3.js';
import { Transaction } from '@hashgraph/sdk';
import useLocalStorage from '@hooks/useLocalStorage';

export type BladeAccountId = string;

export const BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME = `${
  WALLET_CONFIG_NAME ?? 'mintbar'
}-BladeWalletData-${ HEDERA_NETWORK ?? 'no-network' }`;

const BLADE_SESSION_PARAMS = {
  network:
    HEDERA_NETWORK === 'mainnet'
      ? HederaNetwork.Mainnet
      : HederaNetwork.Testnet,
  dAppCode: BLADE_WALLET_DAPP_CODE,
};

const BLADE_CONNECTOR_INSTANCE_DATA = {
  name: WALLET_CONFIG_NAME ?? '(no dApp name defined)',
  description: WALLET_CONFIG_DESCRIPTION,
  url: WALLET_CONFIG_URL,
  icons: [WALLET_CONFIG_ICON_URL],
};

const BLADE_CONNECTOR_LISTENERS_METHODS_NAMES = [
  'onWalletLocked',
  'onSessionDisconnect',
  'onSessionExpire',
] as const;

const useBladeWallet = () => {
  const [bladeConnector, setBladeConnector] = useState<null | BladeConnector>(
    null
  );
  const [activeAccountId, setActiveAccountId] = useState<string | undefined>(
    undefined
  );
  const [localStorageBladeWalletId, updateLocalStorageBladeWalletId] =
    useLocalStorage(BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME);

  const disconnect = useCallback(async () => {
    if (!bladeConnector) {
      throw new Error('BladeConnector not initialized!');
    }

    await bladeConnector.killSession();
    setActiveAccountId(undefined);
    updateLocalStorageBladeWalletId(undefined);
  }, [bladeConnector, updateLocalStorageBladeWalletId]);

  const addListeners = useCallback(
    async (bladeConnectorInstance: BladeConnector) => {
      for (const listenerMethodName of BLADE_CONNECTOR_LISTENERS_METHODS_NAMES) {
        await bladeConnectorInstance[listenerMethodName](disconnect);
      }
    },
    [disconnect]
  );

  const checkIfBladeConnectorInstanceExists = useCallback(
    (
      bladeConnector: null | BladeConnector
    ): bladeConnector is BladeConnector => {
      if (isNull(bladeConnector)) {
        throw new Error('BladeWallet is not detected!');
      }

      return true;
    },
    []
  );

  const setActiveBladeAccount = useCallback(
    async (accountId: string) => {
      if (checkIfBladeConnectorInstanceExists(bladeConnector)) {
        try {
          await bladeConnector.selectAccount(accountId);
        } catch {
          throw new Error(
            `Account "${ accountId }" is not paired. Pair this account with BladeWallet first.`
          );
        }

        const activeAccount = bladeConnector.getSigner()?.getAccountId();

        if (!activeAccount) {
          throw new Error(
            'No active account detected! Please connect to wallet first.'
          );
        }

        updateLocalStorageBladeWalletId(activeAccount.toString());

        setActiveAccountId(activeAccount.toString());
      }
    },
    [
      bladeConnector,
      checkIfBladeConnectorInstanceExists,
      updateLocalStorageBladeWalletId,
    ]
  );

  const createSession = useCallback(
    async (accountId?: string) => {
      if (checkIfBladeConnectorInstanceExists(bladeConnector)) {
        let pairedAccounts: string[] = [];

        try {
          pairedAccounts = await bladeConnector.createSession(
            BLADE_SESSION_PARAMS
          );
        } catch (e) {
          if (
            (e as WalletError).message === 'User rejected session' ||
            (e as WalletError).code === (1000 as ErrorCodes)
          ) {
            throw new Error('User rejected pairing in BladeWallet extension.');
          }

          throw new Error(
            'Cannot create new BladeWallet session. Please make sure you have BladeWallet extension installed.'
          );
        }

        if (pairedAccounts.length <= 0) {
          throw new Error('No accounts paired! Try again.');
        }

        await setActiveBladeAccount(accountId ? accountId : pairedAccounts[0]);
      }
    },
    [bladeConnector, checkIfBladeConnectorInstanceExists, setActiveBladeAccount]
  );

  const signAndSendTransaction = useCallback(
    async (transaction: Transaction) => {
      if (!checkIfBladeConnectorInstanceExists(bladeConnector)) {
        return null;
      }

      const signer = bladeConnector.getSigner();

      if (!signer) {
        throw new Error(
          'BladeSigner not available! Please connect to wallet first.'
        );
      }

      transaction = await signer.populateTransaction(transaction);

      transaction = await signer.signTransaction(transaction.freeze());

      const result = await transaction.executeWithSigner(signer);

      const receipt = await result.getReceiptWithSigner(signer);

      const status = receipt.status.toString();

      if (status !== 'SUCCESS') {
        throw new Error(`Transaction failed with status: ${ status }.`);
      }

      return receipt;
    },
    [bladeConnector, checkIfBladeConnectorInstanceExists]
  );

  const initializeBladeConnector = useCallback(async () => {
    try {
      const bladeConnectorInstance = await BladeConnector.init(
        ConnectorStrategy.EXTENSION, // force use BladeWallet extension (also WalletConnect is avaible)
        BLADE_CONNECTOR_INSTANCE_DATA
      );

      await addListeners(bladeConnectorInstance);

      setBladeConnector(bladeConnectorInstance);
    } catch {
      setBladeConnector(null);
    }
  }, [addListeners]);

  const tryRestoreSession = useCallback(async () => {
    if (localStorageBladeWalletId && isString(localStorageBladeWalletId)) {
      await createSession(localStorageBladeWalletId);
    }
  }, [createSession, localStorageBladeWalletId]);

  // useEffect(() => {
  //   if (!bladeConnector) {
  //     initializeBladeConnector().catch((e: Error) => {
  //       toast.error(e.message);
  //     });
  //   }
  // }, [bladeConnector, initializeBladeConnector]);

  // useEffect(() => {
  //   if (bladeConnector !== null) {
  //     tryRestoreSession().catch((e: Error) => {
  //       toast.error(e.message);
  //     });
  //   }
  // }, [bladeConnector, tryRestoreSession]);

  return {
    activeBladeWalletAccountId: activeAccountId,
    disconnectFromBladeWallet: disconnect,
    createBladeWalletSession: createSession,
    sendTransactionWithBladeWallet: signAndSendTransaction,
  };
};

export default useBladeWallet;
