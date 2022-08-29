import { HEDERA_NETWORK } from '@/../Global.d';
import axios from 'axios';
import { Buffer } from 'buffer'
import { TokenId } from '@hashgraph/sdk';
import map from 'lodash/map';
import filter from 'lodash/filter';
import { TokenInfo, TokenSupplyType } from '@utils/entity/TokenInfo';
import { NFTInfo, NFTInfoWithMetadata, NFTTransactionHistory } from '@utils/entity/NFTInfo';

interface Token {
  token_id: string,
  balance: number,
}

interface AccountBalance {
  account: string,
  balance: number,
  tokens: Token[],
}

interface BalanceResponse {
  balances: AccountBalance[],
  timestamp: string,
}

interface AccountResponse {
  balance: AccountBalance,
  timestamp: string,
  key: {_type: string; key: string}
}

export default class MirrorNode {
  static url = `https://${ HEDERA_NETWORK === 'mainnet' ? 'mainnet-public' : HEDERA_NETWORK }.mirrornode.hedera.com/api/v1`
  static readonly instance = axios.create({
    baseURL: MirrorNode.url,
  });

  static async fetchAccountBalance(accountId: string) {
    const { data } = await this.instance.get<BalanceResponse>(`/balances?account.id=${ accountId }`);

    return data.balances[0];
  }

  static async fetchAccountInfo(accountId: string) {
    const { data } = await this.instance.get<AccountResponse>(`/accounts/${ accountId }`);

    return data;
  }

  static async fetchTokenInfo(tokenId: string): Promise<TokenInfo> {
    const { data } = await this.instance.get(`/tokens/${ tokenId }`);

    return data;
  }

  static async fetchTokenBalanceInfo(tokenId: string, accountId: string): Promise<TokenInfo> {
    const { data } = await this.instance.get(`/tokens/${ tokenId }/balances?account.id=${ accountId }`);

    return data;
  }

  static async fetchTokensInfoByAccountId(accountId: string): Promise<TokenInfo> {
    const { data } = await this.instance.get(`/tokens?account.id=${ accountId }`);

    return data;
  }

  static async fetchNFTInfo(tokenId: string | TokenId): Promise<{ nfts: NFTInfo[] }> {
    const { data } = await this.instance.get(`/tokens/${ tokenId }/nfts`);

    return data;
  }

  static async fetchNFTsInfoWithMetadata(tokenId: string | TokenId) : Promise<NFTInfoWithMetadata[]> {
    const loadedNfts = await this.fetchNFTInfo(tokenId)
    const collectionInfo = await this.fetchTokenInfo(tokenId.toString());

    const promises = map(loadedNfts.nfts, async (nft) => {
      if (nft?.metadata) {
        const meta = await MirrorNode.fetchNFTMetadata(atob(nft?.metadata));
        return { ...nft, meta, collection_info: collectionInfo }
      }
      return { ...nft, collection_info: collectionInfo };
    }).filter(async (el) => {
      const elRes = await el;
      return elRes !== undefined;
    });

    const collections = await Promise.all(promises);

    const nftsWithMetadata = filter(
      collections,
      (el) => el && typeof el !== 'undefined'
    );

    return nftsWithMetadata
  }

  static async fetchNFTMetadata(cid: string) {
    if(/^0*$/.test(Buffer.from(cid).toString('hex'))){
      return null
    }

    const url = cid.includes('https://')
      ? cid
      : `https://ipfs.io/ipfs/${ cid.replace('ipfs://', '') }`;

    try {
      const res = await this.instance.get(url, {
        timeout: 4000
      }).catch(() => null);

      if(!res?.data) {
        return
      }

      return res.data;
    } catch(e) {
      return null
    }
  }

  static async fetchEditionTransactionHistory(tokenId: string | TokenId, serialNumber: string | number): Promise<NFTTransactionHistory> {
    const { data } = await this.instance.get(`/tokens/${ tokenId }/nfts/${ serialNumber }/transactions`);

    return data
  }

  static async fetchUserNFTs(accountId: string, options: { onlyAllowedToMint?: boolean, onlyHasNFTs?: boolean } = { onlyAllowedToMint: false, onlyHasNFTs: false }) {
    const {
      onlyAllowedToMint = false,
      onlyHasNFTs = false,
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

          return this.fetchNFTInfo(token.token_id)
            .then(res => ({
              ...res,
              info: tokenInfo,
            }));
        })
    ).then(res => res.filter(Boolean)) as ({ nfts: NFTInfo[], info: TokenInfo } )[];

    if (onlyHasNFTs) {
      return collections.filter(collection => collection?.nfts?.length > 0)
    }

    return collections;
  }
}
