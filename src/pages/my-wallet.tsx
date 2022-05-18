import React, { useCallback, useEffect, useState } from 'react';
import useHederaWallets from '@hooks/useHederaWallets';
import { NFTInfo } from '@utils/entity/NFTInfo';
import { TokenInfo } from '@utils/entity/TokenInfo';
import MirrorNode from '@/services/MirrorNode';
import NFT from '@components/views/my-wallet/NFT';
import Loader from '@components/shared/loader/Loader';
import Hero from '@/components/shared/layout/Hero';
import PageMenu from '@/components/shared/layout/PageMenu';

export default function MyWallet() {
  const { userWalletId } = useHederaWallets();
  const [nfts, setNFTs] = useState<
    { nfts: NFTInfo[]; info: TokenInfo }[] | null
  >([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const accountId = userWalletId ?? null;
      if (!accountId) {
        throw new Error('No account ID');
      }

      const nfts = await MirrorNode.fetchUserNFTs(accountId);

      setNFTs(nfts);
      setLoading(false);
    } catch (e) {
      // toast.error(e.message)
    }
  }, [userWalletId]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <Hero title={'My wallet'} />
      <PageMenu />

      <div className='container'>
        {!userWalletId ? (
          <div>Firstly, you need connect your wallet!</div>
        ) : loading ? (
          <Loader />
        ) : (
          <div>
            <h2>Your NFT's</h2>

            {nfts?.length ? (
              <div className='nft-grid'>
                {nfts.map((nft) => (
                  <NFT key={nft?.nfts[0].token_id} {...nft} />
                ))}
              </div>
            ) : (
              <div>No nfts :(</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
