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

import { HEDERA_NETWORK, HEDERA_MIRROR_NODE_API_VERSION } from '@src/../Global.d';
import axios from 'axios';
import { Buffer } from 'buffer'
import { TokenId } from '@hashgraph/sdk';
import map from 'lodash/map';
import concat from 'lodash/concat';
import entries from 'lodash/entries';
import { TokenInfo, TokenSupplyType } from '@utils/entity/TokenInfo';
import { NFTInfo } from '@utils/entity/NFTInfo';

type GroupedNFTs = {
  [index: string]: NFTInfo[]
}

interface ResponseLinks {
  next: null | string
}

interface Token {
  token_id: string,
  balance: number,
}

interface AccountBalance {
  account: string,
  balance: number,
  tokens: Token[],
}

interface AccountResponse {
  balance: AccountBalance,
  timestamp: string,
  key: {_type: string; key: string}
}

interface FetchAllNFTsResponse {
  nfts: NFTInfo[];
  links: ResponseLinks;
}

export default class MirrorNode {
  static url = `https://${ HEDERA_NETWORK === 'mainnet' ? 'mainnet-public' : HEDERA_NETWORK }.mirrornode.hedera.com/api/${ HEDERA_MIRROR_NODE_API_VERSION }`
  static readonly instance = axios.create({
    baseURL: MirrorNode.url,
  });

  static async fetchAccountInfo(accountId: string) {
    const { data } = await this.instance.get<AccountResponse>(`/accounts/${ accountId }`);

    return data;
  }

  static async fetchTokenInfo(tokenId: string): Promise<TokenInfo> {
    const { data } = await this.instance.get(`/tokens/${ tokenId }`);

    return data;
  }

  static async fetchNFTInfo(tokenId: string | TokenId): Promise<{ nfts: NFTInfo[] }> {
    const { data } = await this.instance.get(`/tokens/${ tokenId }/nfts`);

    return data;
  }

  static async fetchNFTMetadata(cid: string) {
    if (/^0*$/.test(Buffer.from(cid).toString('hex'))) {
      return null
    }

    const url = cid.includes('https://')
      ? cid
      : `https://ipfs.io/ipfs/${ cid.replace('ipfs://', '') }`;

    try {
      const res = await this.instance.get(url, {
        timeout: 4000
      }).catch(() => null);

      if (!res?.data) {
        return
      }

      return res.data;
    } catch (e) {
      return null
    }
  }

  static async fetchUserCollectionsInfo(
    accountId: string,
    options: {
      fetchNftsData?: boolean,
      onlyAllowedToMint?: boolean,
      onlyHasNFTs?: boolean
    } = { onlyAllowedToMint: false, onlyHasNFTs: false }) {
    const {
      onlyAllowedToMint = false,
      onlyHasNFTs = false,
      fetchNftsData = false
    } = options;
    const { balance, key } = await this.fetchAccountInfo(accountId);

    if (!balance.tokens) {
      throw new Error('No NFTs');
    }

    const collections = await Promise.all(
      balance.tokens
        .map(async token => {
          const tokenInfo = await this.fetchTokenInfo(token.token_id);

          if (
            tokenInfo.type !== 'NON_FUNGIBLE_UNIQUE' ||
            (
              onlyAllowedToMint &&
              tokenInfo?.supply_key?.key !== key.key ||
              (
                tokenInfo?.supply_type === TokenSupplyType.FINITE &&
                parseInt(tokenInfo.total_supply ?? '0') >= parseInt(tokenInfo.max_supply ?? '0')
              )
            )
          ) {
            return null;
          }

          if (fetchNftsData) {
            return this.fetchNFTInfo(token.token_id)
              .then(res => ({
                ...res,
                info: tokenInfo,
              })
            );
          }

          return {
            info: tokenInfo
          }

        })
    ).then(res => res.filter(Boolean)) as ({ nfts: NFTInfo[], info: TokenInfo } )[];

    if (onlyHasNFTs) {
      return collections.filter(collection => collection?.nfts?.length > 0)
    }

    return collections;
  }

  static async fetchAllNFTs(idOrAliasOrEvmAddress: string, nextLink?: string) {
      const { data } = await this.instance.get<FetchAllNFTsResponse>(
        nextLink
          ? nextLink.split(`api/${ HEDERA_MIRROR_NODE_API_VERSION }/`)[1]
          : `/accounts/${ idOrAliasOrEvmAddress }/nfts`
      );

      nextLink = undefined;

      let nfts : NFTInfo[] = data.nfts

      if (data.links.next) {
        nextLink = data.links.next
      }

      if (nextLink) {
        const nextLinkNfts = await this.fetchAllNFTs(idOrAliasOrEvmAddress, nextLink);

        nfts = concat(nfts, nextLinkNfts)
      }

      return nfts
  }

  static async fetchCollectionInfoForGroupedNFTs(groupedNfts: GroupedNFTs) {
    const groupedNFTsByCollectionIdWithInfo = await Promise.all(
      map(entries(groupedNfts), async ([collectionId, nfts]) => ({
        collection_id: collectionId,
        nfts,
        collection_info: await this.fetchTokenInfo(collectionId)
      }))
    )

    return groupedNFTsByCollectionIdWithInfo
  }
}
