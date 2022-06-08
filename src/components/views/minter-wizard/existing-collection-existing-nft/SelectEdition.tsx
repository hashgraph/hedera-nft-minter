import React, { useCallback, useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';

import MirrorNode from '@/services/MirrorNode';
import { NFTInfo } from '@/utils/entity/NFTInfo';
import { WizardValues } from '@/utils/const/minter-wizard';
import Loader from '@/components/shared/loader/Loader';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import SemiNFT from '@/components/shared/minter-wizard/semi-nft';

export default function SelectEdition() {
  const [nfts, setNfts] = useState<{ [key: string]: NFTInfo[] }>({});
  const [isLoading, setLoading] = useState(true);
  const { values } = useFormikContext<WizardValues>();

  const loadNfts = useCallback(async () => {
    const loadedNfts = await MirrorNode.fetchNFTInfo(values.token_id as string)

    const nftsWithMetadata = await Promise.all(
      loadedNfts.nfts.map(async (nft) => {
        const meta = await MirrorNode.fetchNFTMetadata(atob(nft?.metadata));

        return { ...nft, meta };
      })
    );

    setNfts(groupBy(nftsWithMetadata, 'meta.image'));
    setLoading(false);
  }, [values.token_id])

  useEffect(() => {
    loadNfts()
  }, [loadNfts])

  return (
    <div>
      {isLoading ? <div className='my-nft-collection__loader-wrapper'>
        <Loader />
        Gathering collections info...
      </div> :
        <>
          <p>Select NFT you want to copy</p>
          {map(nfts, (nft, key) => (
            <SemiNFT
              key={key}
              data={nft}
            />
          ))}

          <p>Selected edition:</p>

          <pre>
            {JSON.stringify(nfts, null, 2)}
          </pre>

          <div>
            <FieldWrapper
              fastField
              name='qty'
              type='number'
              label='Number of editions to mint'
              max='10'
            />
          </div>

          <button type='submit'>Mint</button>
        </>
      }
    </div>
  );
}
