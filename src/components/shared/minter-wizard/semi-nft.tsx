import { useFormikContext } from 'formik';
import { useState, useCallback, useEffect } from 'react';
import MirrorNode from '@/services/MirrorNode';
import { NFTInfo } from '@/utils/entity/NFTInfo';
import { WizardValues } from '@/utils/const/minter-wizard';
import { NFTMetadata } from '@/utils/entity/NFT-Metadata';
import Loader from '@components/shared/loader/Loader';
import placeholder from '@assets/images/placeholder.png';

export default function SemiNFT({ data }: { data: NFTInfo }) {
  const [meta, setMeta] = useState<NFTMetadata | null>(null)
  const [isLoading, setLoading] = useState(true);
  const { setFieldValue } = useFormikContext<WizardValues>()

  const loadMetadata = useCallback(async (cid: string) => {
    try {
      const json = await MirrorNode.fetchNFTMetadata(cid);

      if (typeof json === 'object') {
        setMeta(json);
      }
    } catch (e) {
      // toast.error(e.message)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (data) {
      loadMetadata(atob(data.metadata));
    } else {
      setLoading(false);
    }
  }, [loadMetadata, data]);

  return (<div>
    <label>#{data.serial_number}</label>
    {isLoading ? (
        <div className='my-nft-collection__loader-wrapper'>
          <Loader />
        </div>
      ) : meta?.image ? (
        <div className='nft__table__row__image'>
          <img src={`https://ipfs.io/ipfs/${ meta.image }`} alt='' />
        </div>
      ) : (
        <div className='nft__table__row__image'>
          <img src={placeholder} alt='' />
        </div>
    )}
    <button type='button' onClick={() => setFieldValue('serial_number', data.serial_number)}>
      Select {meta?.name}
    </button>
  </div>)
}
