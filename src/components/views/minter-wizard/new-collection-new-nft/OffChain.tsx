import React from 'react';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import DragAndDropFileInput from '@/components/shared/form/DragAndDropFileInput';
import Error from '@/components/shared/form/Error';

export default function OffChain() {
  return (
    <div>
      <div className='form__row__two-columns'>
        <div className='form__row__two-columns'>
          <div>
            <FieldWrapper
              fastField
              name='name'
              type='text'
              label='Collection name'
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='symbol'
              type='text'
              label='Collection symbol'
            />
          </div>
        </div>
        <div className='form__row'>
          <label htmlFor='image'>File:</label>
          <DragAndDropFileInput name='image' />
          <div className='form__error_wrapper'>
            <Error name='image' />
          </div>
        </div>
      </div>
      <div className='form__row__two-columns'>
        <div>
          <FieldWrapper
            fastField
            name='edition_name'
            type='test'
            label='Edition name'
          />
          <FieldWrapper
            fastField
            name='description'
            type='test'
            label='Description'
          />
        </div>
        <div className='form__row__two-columns'>
          <div>
            <FieldWrapper
              fastField
              name='creator'
              type='text'
              label='Creator'
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='creatorDID'
              type='text'
              label='Creator DID'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
