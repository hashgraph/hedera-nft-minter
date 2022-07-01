import React, {useMemo} from 'react';
import { useField } from 'formik';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import DragAndDropFileInput from '@/components/shared/form/DragAndDropFileInput';
import Error from '@/components/shared/form/Error';
import { MintTypes } from '@/utils/entity/MinterWizard';

export default function OffChainBasis() {
  const [field] = useField('mint_type');

  const disabledCollectionInfo = useMemo(() =>
    field.value === MintTypes.ExistingCollectionNewNFT,
  [field.value])

  return (
    <div>
      <div className='form__row__two-columns'>
        <div className='form__row'>
          <label htmlFor='image'>NFT image:</label>
          <DragAndDropFileInput name='image' />
          <div className='form__error_wrapper'>
            <Error name='image' />
          </div>
        </div>
        <div className='form__row'>
          <div>
            <FieldWrapper
              fastField
              name='name'
              type='text'
              label='Collection name'
              placeholder='e.g HBAR to the Moon'
              disabled={disabledCollectionInfo}
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='symbol'
              type='text'
              label='Collection symbol'
              placeholder='e.g MOON'
              disabled={disabledCollectionInfo}
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='edition_name'
              type='text'
              label='NFT name'
              placeholder='e.g Blood Moon HBAR'
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='description'
              as='textarea'
              type='text'
              label='NFT description'
              placeholder='Blood Moon HBAR NFT is the first in the collection...'
            />
          </div>
          <div className='form__row__two-columns'>
            <div>
              <FieldWrapper
                fastField
                name='creator'
                type='text'
                label='NFT creator'
                placeholder='e.g John Smith'
              />
            </div>
            <div>
              <FieldWrapper
                fastField
                name='creatorDID'
                type='text'
                label='NFT creator DID'
                placeholder='DID url'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
