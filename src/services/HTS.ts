import { TokenCreateTransaction } from '@hashgraph/sdk';

export default class HTS {
  static createToken(tokenName: string, tokenSymbol: string): void {
    const token = new TokenCreateTransaction({
      tokenName,
      tokenSymbol,
    })

    // eslint-disable-next-line no-console
    console.log({ token });
  }
}
