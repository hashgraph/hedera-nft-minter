import axios from 'axios';
import { TokenId } from '@hashgraph/sdk';
import { TokenInfo } from '@utils/entity/TokenInfo';
import { NFTInfo } from '@utils/entity/NFTInfo';

interface Token {
  token_id: string;
  balance: number;
}

interface AccountBalance {
  account: string;
  balance: number;
  tokens: Token[];
}

interface BalanceResponse {
  balances: AccountBalance[];
  timestamp: string;
}

export default class MirrorNode {
  static url = 'https://testnet.mirrornode.hedera.com/api/v1';
  static readonly instance = axios.create({
    baseURL: MirrorNode.url,
  });

  static async fetchAccountBalance(accountId: string) {
    const { data } = await this.instance.get<BalanceResponse>(
      `/balances?account.id=${ accountId }`
    );

    return data.balances[0];
  }

  static async fetchTokenInfo(tokenId: string): Promise<TokenInfo> {
    const { data } = await this.instance.get(`/tokens/${ tokenId }`);

    return data;
  }

  static async fetchNFTInfo(
    tokenId: string | TokenId
  ): Promise<{ nfts: NFTInfo[] }> {
    const { data } = await this.instance.get(`/tokens/${ tokenId }/nfts`);

    return data;
  }

  static async fetchNFTMetadata(cid: string) {
    const url = `https://ipfs.io/ipfs/${ cid.replace('ipfs://', '') }`;
    const { data } = await this.instance.get(url);

    return data;
  }

  static async fetchUserNFTs(accountId: string) {
    const balance = await this.fetchAccountBalance(accountId);

    if (!balance.tokens) {
      throw new Error('No NFTs');
    }

    const nfts = (await Promise.all(
      balance.tokens
        .filter((i) => i.balance > 0)
        .map(async (token) => {
          const t = await this.fetchTokenInfo(token.token_id);

          if (t.type !== 'NON_FUNGIBLE_UNIQUE') {
            return null;
          }

          return this.fetchNFTInfo(token.token_id).then((res) => ({
            ...res,
            info: t,
          }));
        })
    )) as { nfts: NFTInfo[]; info: TokenInfo }[];

    return nfts.filter(Boolean);
  }
}
