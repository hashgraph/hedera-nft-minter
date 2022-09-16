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
    <div className='minter-wizard__off-chain'>
      <p className='title--medium title--strong'>General information:</p>
      <div className='minter-wizard__off-chain__form'>
        <div className='form__row'>
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
              placeholder='Collection name'
              maxLength={100}
              disabled={disabledCollectionInfo}
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='symbol'
              type='text'
              placeholder='Collection symbol'
              maxLength={100}
              disabled={disabledCollectionInfo}
            />
          </div>
          <div className='mb-1'>
            <FieldWrapper
              fastField
              name='edition_name'
              type='text'
              placeholder='NFT name'
              maxLength={100}
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='description'
              as='textarea'
              type='text'
              placeholder='NFT description'
              maxLength={1000}
            />
          </div>
          <div className='form__row'>
            <div>
              <FieldWrapper
                fastField
                name='creator'
                type='text'
                placeholder='NFT creator'
                maxLength={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
