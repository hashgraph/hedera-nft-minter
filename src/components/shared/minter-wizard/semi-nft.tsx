import { useState, useCallback, useEffect, useMemo } from 'react';
import { useFormikContext } from 'formik';
import  classNames  from 'classnames';
import pick from 'lodash/pick';
import MirrorNode from '@/services/MirrorNode';
import { NFTInfo } from '@/utils/entity/NFTInfo';
import { WizardValues } from '@/utils/const/minter-wizard';
import { NFTMetadata } from '@/utils/entity/NFT-Metadata';
import Loader from '@components/shared/loader/Loader';
import placeholder from '@assets/images/placeholder.png';

export default function SemiNFT({ data }: { data: NFTInfo }) {
  const [meta, setMeta] = useState<NFTMetadata | null>(null)
  const [isLoading, setLoading] = useState(true);
  const { values, setFieldValue } = useFormikContext<WizardValues>()

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

  const renderValue = useCallback((value) =>
    value ? value : <span>(empty)</span>
  , []);

  const isActive = useMemo(()=>
    data?.serial_number === values?.serial_number,
  [data.serial_number, values.serial_number])

  const setFields = useCallback(() => {
    setFieldValue('serial_number', data?.serial_number)

    if(meta){
      const filteredMeta = pick(meta, ['name', 'creator', 'description', 'image', 'attributes'])
      for(const [index, value] of Object.entries(filteredMeta ?? {})){
        if(index === 'name'){
          setFieldValue('edition_name', value)
        }

        else{
          setFieldValue(index, value)
        }
      }
    }
  }, [setFieldValue, meta, data.serial_number])

  const classname = classNames('minter-wizard__select-edition__semi-nft',
  {
    active: isActive
  })

  return (<div className={classname}>
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
    <h4>#{data.serial_number} edition name: {meta?.name}</h4>
    <div>
      <label htmlFor='null'>Description</label>
      <p>{renderValue(meta?.description)}</p>
      <label htmlFor='null'>Creator</label>
      <p>{renderValue(meta?.creator)}</p>
      {meta?.properties?.length && (
        <>
          <label htmlFor='null'>Properties</label>
          {meta?.properties?.map((p, i) =>
            // eslint-disable-next-line react/no-array-index-key
            <p key={`property_${ i }`}>{p.name}: <span>{p.value}</span></p>
          )}
        </>
      )}

      {meta?.attributes?.length && (
        <>
          <label htmlFor='null'>Attributes</label>
          {meta?.attributes?.map((p, i) =>
            // eslint-disable-next-line react/no-array-index-key
            <p key={`attribute_${ i }`}>{p.trait_type}: <span>{p.value}</span></p>
          )}
        </>
      )}
      <button type='button' onClick={setFields}>
        Select {renderValue(meta?.name)}
      </button>
    </div>
  </div>)
}
