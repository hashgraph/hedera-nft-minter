import React, { useCallback, useEffect, useState } from 'react';
import useHederaWallets from '@hooks/useHederaWallets';
import { NFTInfo } from '@utils/entity/NFTInfo';
import { TokenInfo } from '@utils/entity/TokenInfo';
import MirrorNode from '@/services/MirrorNode';
import NFT from '@/components/views/my-nft-collection/NFT';
import Loader from '@components/shared/loader/Loader';
import Hero from '@/components/shared/layout/Hero';
import PageMenu from '@/components/shared/layout/PageMenu';

export default function MyNFTCollection() {
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
      <Hero darkSchema title={'My NFT Collection'}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed mi in
          purus aliquet imperdiet. Nulla risus felis, porttitor eget lacus vel,
          egestas molestie nibh. Duis commodo, nulla eu mollis dictum, mauris
          arcu consectetur risus, in vulputate turpis risus sed est. Sed sed
          odio et nunc tempor malesuada.
        </p>
      </Hero>
      <PageMenu />

      <div className='container'>
        {!userWalletId ? (
          <div>Firstly, you need connect your wallet!</div>
        ) : loading ? (
          <div className='my-nft-collection__loader-wrapper'>
            <Loader />
          </div>
        ) : (
          <div>
            {nfts?.length ? (
              <div className='my-nft-collection'>
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
