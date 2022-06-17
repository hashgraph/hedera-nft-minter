import React from 'react';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import DragAndDropFileInput from '@/components/shared/form/DragAndDropFileInput';
import Error from '@/components/shared/form/Error';

export default function OffChainBasis() {
  return (
    <div>
      <div className='form__row__two-columns'>
        <div className='form__row'>
          <label htmlFor='image'>File:</label>
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
              placeholder="E.g. 'New Super Collection'"
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='symbol'
              type='text'
              label='Collection symbol'
              placeholder="E.g. 'NSC'"
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='edition_name'
              type='text'
              label='Edition name'
              placeholder="E.g. 'Magic edition'"
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='description'
              as='textarea'
              type='text'
              label='Description'
              placeholder='This is magic NFT...'
            />
          </div>
          <div className='form__row__two-columns'>
            <div>
              <FieldWrapper
                fastField
                name='creator'
                type='text'
                label='Creator'
                placeholder='E.g. John Wright'
              />
            </div>
            <div>
              <FieldWrapper
                fastField
                name='creatorDID'
                type='text'
                label='Creator DID'
                placeholder='DID url'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
