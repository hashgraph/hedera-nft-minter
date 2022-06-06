import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormikContext } from 'formik';

import FieldWrapper from '@/components/shared/form/FieldWrapper';
import MirrorNode from '@/services/MirrorNode';
import { WizardValues } from '@/utils/const/minter-wizard';
import { NFTInfo } from '@/utils/entity/NFTInfo';
import Loader from '@/components/shared/loader/Loader';
import SemiNFT from '@/components/shared/minter-wizard/semi-nft';


export default function SelectEdition() {

  const [nfts, setNfts] = useState<NFTInfo[]>([])
  const [meta, setMeta] = useState({})
  const [isLoading, setLoading] = useState(true);
  const { values, setFieldValue } = useFormikContext<WizardValues>()


  const loadNfts = useCallback(async () => {
    const loadedNfts = await MirrorNode.fetchNFTInfo(values.token_id as string)

    setNfts(loadedNfts.nfts)
    setLoading(false);
  }, [setNfts, setLoading, values.token_id])

  useEffect(() => {
    loadNfts()
  }, [loadNfts])


  const selectedNft = useMemo(
    () => {
      const serial = nfts
        .find(nft => nft.serial_number === parseInt(values.serial_number as string))
      setFieldValue('serial_metadata', meta)
      return serial;
    }
    , [values.serial_number, nfts, meta, setFieldValue])


  const loadMeta = useCallback(async () => {
    if (selectedNft?.metadata) {
      const meta = await MirrorNode.fetchNFTMetadata(atob(selectedNft?.metadata))
      setMeta(meta);
    }
  }, [selectedNft])


  useEffect(() => {
    loadMeta()
  }, [loadMeta])


  return (
    <div>
      {isLoading ? <div className='my-nft-collection__loader-wrapper'>
        <Loader />
        Gathering collections info...
      </div> :
        <>
          <p>Select NFT you want to copy</p>
          {nfts.map(nft => <SemiNFT
            key={`semi_nftf_${ nft.token_id }.${ nft.serial_number }`}
            data={nft}
                           />)}

          <p>Selected edition:</p>

          <pre>
            {JSON.stringify(meta, null, 2)}
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
