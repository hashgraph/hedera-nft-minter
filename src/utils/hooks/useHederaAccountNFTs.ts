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

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import groupBy from 'lodash/groupBy';
import MirrorNode, { GroupedNFTsByCollectionIdWithInfo } from '@services/MirrorNode';

export default function useHederaAccountNFTs(userWalletId: string | undefined, showLoadError = false) {
  const [collections, setCollections] = useState<GroupedNFTsByCollectionIdWithInfo[] | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchHederaAccountNFTs = useCallback(async (onlyAllowedToMint = false) => {
    let groupedCollections;

    try {
      const accountId = userWalletId ?? null;

      if (!accountId) {
        throw new Error('No account ID! Connect wallet first.');
      }

      const fetchedNfts = await MirrorNode.fetchAllNFTs(accountId)
      const groupedFetchedNfts = groupBy(fetchedNfts, 'token_id');

      groupedCollections = await MirrorNode.fetchCollectionInfoForGroupedNFTs(groupedFetchedNfts);

      if (onlyAllowedToMint) {
        groupedCollections = await MirrorNode.filterCollectionInfoForGroupedNFTs(groupedCollections, accountId, { onlyAllowedToMint })
      }

      setCollections(groupedCollections);
      setLoading(false);

    } catch (e) {
      if (showLoadError && e instanceof Error) {
        toast.error(e.message)
      }
    }

    return groupedCollections
  }, [showLoadError, userWalletId]);

  useEffect(() => {
    if (!userWalletId) {
      setCollections(null)
      setLoading(true)
    }
  }, [userWalletId])

  return {
    collections,
    loading,
    fetchHederaAccountNFTs
  }
}
