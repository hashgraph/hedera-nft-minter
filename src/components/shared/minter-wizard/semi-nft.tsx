import { useFormikContext } from 'formik';

import { NFTInfo } from '@/utils/entity/NFTInfo';
import { WizardValues } from '@/utils/const/minter-wizard';

import placeholder from '@assets/images/placeholder.png';
import { useMemo } from 'react';

export default function SemiNFT({ data }: { data: NFTInfo[] }) {
  const { setFieldValue } = useFormikContext<WizardValues>()

  const serials = useMemo(() => data.map(d => d.serial_number), [data]);

  return (
    <div>
      <label># {serials.sort((a,b) => a-b).join(', ')}</label>
      {data[0]?.meta.image ? (
        <div className='nft__table__row__image'>
          <img src={`https://ipfs.io/ipfs/${ data[0].meta.image }`} alt='' />
        </div>
      ) : (
        <div className='nft__table__row__image'>
          <img src={placeholder} alt='' />
        </div>
      )}
      <button type='button' onClick={() => setFieldValue('serial_number', data[0].serial_number)}>
        Select {data[0].meta.name}
      </button>
    </div>
  );
}
