import { HEDERA_NETWORK } from '@/../Global.d';
import axios from 'axios';
import { TokenId } from '@hashgraph/sdk';
import { TokenInfo } from '@utils/entity/TokenInfo';
import { NFTInfo } from '@utils/entity/NFTInfo';

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
  static url = `https://${ HEDERA_NETWORK }.mirrornode.hedera.com/api/v1`
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

  static async fetchNFTMetadata(cid: string) {
    const url = `https://ipfs.io/ipfs/${ cid.replace('ipfs://', '') }`;
    const { data } = await this.instance.get(url);

    return data;
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
        .filter(i => i.balance > 0)
        .map(async token => {
          const t = await this.fetchTokenInfo(token.token_id);

          if (t.type !== 'NON_FUNGIBLE_UNIQUE') {
            return null;
          }

          if (onlyAllowedToMint && (
            (t?.admin_key?.key !== key.key && t?.supply_key?.key !== key?.key)
            || (parseInt(t.total_supply as string || '0') >= parseInt(t.max_supply as string || '0'))
          )) {
            return null;
          }

          return this.fetchNFTInfo(token.token_id)
            .then(res => ({
              ...res,
              info: t,
            }));
        })
    )
      .then(res => res.filter(Boolean)) as ({ nfts: NFTInfo[], info: TokenInfo } )[];

    if (onlyHasNFTs) {
      return collections.filter(collection => collection?.nfts?.length > 0)
    }

    return collections;
  }
}
