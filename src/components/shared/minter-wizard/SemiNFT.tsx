import { useCallback, useMemo } from 'react';
import { useFormikContext } from 'formik';
import classNames from 'classnames';
import pick from 'lodash/pick';
import renderValue from '@/utils/helpers/renderValue';
import { NFTInfo } from '@/utils/entity/NFTInfo';
import { WizardValues } from '@/utils/const/minter-wizard';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import placeholder from '@assets/images/placeholder.png';

export default function SemiNFT({ data }: { data: NFTInfo[] }) {
  const { values, setFieldValue } = useFormikContext<WizardValues>()

  const serials = useMemo(() => data.map(d => d.serial_number), [data]);

  const isActive = useMemo(() => {
    if(
      typeof values?.serial_number !== 'undefined' &&
      data[0]?.serial_number === parseInt(values.serial_number)
    ){
      setFieldValue('serial_metadata', data[0]?.meta)
      return true
    }
    return false
  }, [data, setFieldValue, values.serial_number])

  const setFields = useCallback(() => {
    setFieldValue('serial_number', data[0]?.serial_number)

    if (data[0]?.meta) {
      const filteredMeta = pick(data[0]?.meta, ['name', 'creator', 'description', 'image', 'attributes'])
      for (const [index, value] of Object.entries(filteredMeta ?? {})) {
        if (index === 'name') {
          setFieldValue('edition_name', value)
        }

        else {
          setFieldValue(index, value)
        }
      }
    }
  }, [setFieldValue, data])

  const classname = classNames('minter-wizard__select-edition__semi-nft', {
    active: isActive
  })

  return (
    <div className={classname}>
      {data[0]?.meta?.image ? (
        <div className='nft__table__row__image'>
          <img src={`https://ipfs.io/ipfs/${ data[0]?.meta.image }`} alt='' />
        </div>
      ) : (
        <div className='nft__table__row__image'>
          <img src={placeholder} alt='' />
        </div>
      )}
      <h4>#{serials.sort((a,b) => a-b).join(', ')} edition name: {data[0]?.meta?.name}</h4>
      <div>
        <label htmlFor='null'>Description</label>
        <p>{renderValue(data[0]?.meta?.description)}</p>
        <label htmlFor='null'>Creator</label>
        <p>{renderValue(data[0]?.meta?.creator)}</p>

        {data[0]?.meta?.attributes?.length && (
          <>
            <label htmlFor='null'>Attributes</label>
            {data[0]?.meta?.attributes?.map((p, i) =>
              // eslint-disable-next-line react/no-array-index-key
              <p key={`attribute_${ i }`}>{p.trait_type}: <span>{p.value}</span></p>
            )}
          </>
        )}
        <button type='button' onClick={setFields}>
          Select {renderValue(data[0]?.meta?.name)}
        </button>
      </div>
    </div>
  )
}
