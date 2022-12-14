// Copyright 2022 2022 - 2023 Hedera Hashgraph, LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useState, useCallback, useEffect } from 'react';
import { HashConnect } from 'hashconnect';
import { toast } from 'react-toastify';
import { HashConnectState } from '@utils/hooks/wallets/useHashPack';

export default function useHashConnectEvents(
  hashConnect: HashConnect,
  setHashConnectState: React.Dispatch<React.SetStateAction<Partial<HashConnectState>>>
) {
  const [isIframeParent, setIsIFrameParent] = useState(false);

  const updatePairingData = useCallback(data => {
    setHashConnectState(prev => ({
      ...prev,
      pairingData: {
        ...prev.pairingData,
        ...data
      }
    }))
  }, [setHashConnectState])

  const foundExtensionEventHandler = useCallback((data) => {
    setHashConnectState(prev => ({
      ...prev,
      availableExtension: data
    }))
  }, [setHashConnectState]);

  const pairingEventHandler = useCallback((data) => {
    updatePairingData(data);

    toast.success('➕ New HashPack account(s) paired!');
  }, [updatePairingData]);

  const foundIframeEventHandler = useCallback((data) => {
    updatePairingData(data);

    setIsIFrameParent(true)
  }, [updatePairingData])

  const mountEvents = useCallback(() => {
    if (hashConnect) {
      hashConnect.foundExtensionEvent.on(foundExtensionEventHandler)
      hashConnect.pairingEvent.on(pairingEventHandler)
      hashConnect.foundIframeEvent.on(foundIframeEventHandler)
    }
  }, [foundExtensionEventHandler, hashConnect, pairingEventHandler, foundIframeEventHandler])

  const unMountEvents = useCallback(() => {
    if (hashConnect) {
      hashConnect.foundExtensionEvent.off(foundExtensionEventHandler)
      hashConnect.pairingEvent.off(pairingEventHandler)
      hashConnect.foundIframeEvent.off(foundIframeEventHandler)
    }
  }, [foundExtensionEventHandler, hashConnect, pairingEventHandler, foundIframeEventHandler])

  useEffect(() => {
    mountEvents()

    return unMountEvents
  }, [mountEvents, unMountEvents])

  return {
    isIframeParent
  }
}
