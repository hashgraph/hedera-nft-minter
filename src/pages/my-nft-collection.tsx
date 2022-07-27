import React, { useCallback, useEffect, useState } from 'react';
import useHederaWallets from '@hooks/useHederaWallets';
import { NFTInfo } from '@utils/entity/NFTInfo';
import { TokenInfo } from '@utils/entity/TokenInfo';
import MirrorNode from '@/services/MirrorNode';
import Collection from '@/components/views/my-nft-collection/Collection';
import Loader from '@components/shared/loader/Loader';
import Hero from '@/components/shared/layout/Hero';
import PageMenu from '@/components/shared/layout/PageMenu';
import Grid from '@/components/shared/grid';

export default function MyNFTCollection() {
  const { userWalletId } = useHederaWallets();
  const [collections, setCollections] = useState<
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

      setCollections(nfts);
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

      <div className='mc--h container--padding container--max-width bg--transparent'>
        {!userWalletId ? (
          <div>Firstly, you need connect your wallet!</div>
        ) : loading ? (
          <div className='my-nft-collection__loader-wrapper'>
            <Loader />
          </div>
        ) : (
          <div>
            {collections?.length ? (
              <Grid className='my-nft-collection'>
                <>
                  {collections.map((collection) => (
                    <Collection key={`${ collection.info.token_id }`} {...collection} />
                  ))}
                </>
              </Grid>
            ) : (
              <div>No nfts :(</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
