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
  const { values } = useFormikContext<WizardValues>()

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
  }, [setNfts, setLoading, values.token_id])

  useEffect(() => {
    loadNfts()
  }, [loadNfts])

  return (
    <div className='wizard-form__select-edition'>
      {isLoading ? <div className='my-nft-collection__loader-wrapper'>
        <Loader />
        Gathering collections info...
      </div> :
        <>
          <h2>Select NFT you want to copy</h2>

          <div>
            <FieldWrapper
              fastField
              name='qty'
              type='number'
              label='Number of editions you want to mint now'
              max='10'
              tooltip='You can mint max 10 tokens at once.'
            />
          </div>
          <hr />
          {map(nfts, (nft, key) => (
            <SemiNFT
              key={key}
              data={nft}
            />
          ))}

        </>
      }
    </div>
  );
}
