import React, { useCallback, useEffect, useState } from 'react';
import useHashConnect from '@hooks/useHashConnect';
import MirrorNode from '@/services/MirrorNode';
import NFT from '@components/views/my-wallet/NFT';
import Loader from '@components/shared/loader/Loader';
import { NFTInfo } from '@utils/entity/NFTInfo';
import { toast } from 'react-toastify';

export default function MyWallet() {
  const { connected, saveData } = useHashConnect();
  const [nfts, setNFTs] = useState<({nfts: NFTInfo[]} | null)[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const accountId = Array.isArray(saveData?.accountIds) ? saveData?.accountIds[0] : null;
      if (!accountId) {
        throw new Error('No account ID');
      }

      const nfts = await MirrorNode.fetchUserNFTs(accountId);

      setNFTs(nfts);
    } catch (e) {
      toast.error(e.message)
    } finally {
      setLoading(false);
    }
  }, [saveData]);

  useEffect(() => {
      load();
  }, [load])

  return (
    <div className='container'>
      {!connected ? (
        <div>Firstly, you need connect your wallet!</div>
      ) : (
        loading ? (
          <Loader />
        ) : (
          <div>
            <h2>Your NFT's</h2>

            <div className='nft-grid'>
              {nfts.map(nft => (
                <NFT key={nft?.nfts[0].token_id} {...nft} />
              ))}
            </div>
          </div>
        )
      )}

    </div>
  )
}
